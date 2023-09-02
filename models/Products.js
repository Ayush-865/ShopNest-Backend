const mongoose=require('mongoose');
const { Schema } = mongoose;

const ProductsSchema= new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    company:{
        type: String,
        required:true,
    },
    image: {
        type: String,
    },
});

module.exports=mongoose.model('products',ProductsSchema);