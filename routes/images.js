const { Router } = require('express');
const router = Router();
const Images = require('../models/imageDetails');
const fetchuser = require('../middleware/fetchuser');

router.post("/imgProfile", fetchuser, async (req, res) => {
  try {
    let userid = req.user.id;
    const image = req.body.image.toString(); // Assuming you've used `express-fileupload` middleware
    console.log(req.body)
    await Images.create({ user: userid, image: image });
    res.send({ Status: "ok" });
  } catch (error) {
    console.error("Error:", error); 
    res.status(500).json({ Status: "error", message: "An error occurred on the server." });
  }
});

router.post("/updateImgProfile", fetchuser, async (req, res) => {
  try {
    let userid = req.user.id;
    const image = req.body.image.toString(); 
    let img = await Product.find({
      "$or": [
          { "name": { $regex: req.params.key } },
      ]
  });
  if(img){
    await Images.deleteOne({ user:userid})
  }
    await Images.create({ user: userid, image: image });
    res.send({ Status: "ok" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ Status: "error", message: "An error occurred on the server.", error: error });
  }
});

router.get("/imgProfile", fetchuser, async (req, res) => {
  try {
    let userid = req.user.id;
    console.log(userid)
    const image = await Images.findOne({ user: userid }).select("-user");
    if(image){
      res.send(image);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");
  }
});

module.exports = router; 