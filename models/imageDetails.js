const mongoose = require('mongoose');

const ImageDetailsSchema = new mongoose.Schema({
        user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
        },
        image: {
                type: String,
        },
});

const Image = mongoose.model("imgs", ImageDetailsSchema);
module.exports = Image
