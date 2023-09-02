const { Router } = require('express');
const router = Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');
const JWT_SECRET = process.env.JWT_SECRET

const { body, validationResult } = require('express-validator');

router.post('/register', [
    body('email', 'Enter valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Enter a strong password').isLength({ min: 5 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(404).json({ error: "Sorry a user with this email exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
});

router.post('/login', [
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password cannot be empty').exists(),

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(404).json({ error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Internal Server error"});
    }
});


router.get('/getuser', fetchuser ,async (req, res) => {
    try {
        let userid=req.user.id;
        const user = await User.findById(userid).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
});
module.exports = router;    
