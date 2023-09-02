const { Router } = require('express');
const router = Router();
const Products = require('../models/Products');
const fetchuser = require('../middleware/fetchuser');

router.get('/getProducts', async (req, res) => {
    let products = await Products.find();
    if (products.length > 0) {
        res.send(products);
    } else {
        res.send({ result: "No Products Found" })
    }
});

router.post('/addProduct', fetchuser, async (req, res) => {

    const { name, price, category, company } = req.body;
    let userid = req.user.id;
    const image = req.body.image.toString();
    try {
        Products.create({ user: userid, name: name, price: price, category: category, company: company, image: image });
        res.status(200).send({ Status: "ok" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
});

router.delete("/product/:id", async (req, res) => {
    let data = await Products.deleteOne({ _id: req.params.id });
    res.send("deleated");
});

router.get("/search/:key", async (req, res) => {
    let data = await Products.find({
        "$or": [
            { "name": { $regex: req.params.key } },
            { "price": { $regex: req.params.key } },
            { "category": { $regex: req.params.key } },
            { "company": { $regex: req.params.key } },
        ]
    });
    res.send(data);
});

router.get('/product/:id', async (req, res) => {
    let result = await Products.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "No Record found" });
    }
})

router.put('/product/:id', async (req, res) => {
    let result = await Products.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    );
    res.send(result);
})

module.exports = router; 