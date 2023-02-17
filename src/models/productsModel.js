import mongoose from "mongoose";

const collection = 'Products';

const schema = new mongoose.Schema({
    title : {
        type : String,
        require : true
    },
    description: {
        type: String,
        required: true
    },
    stock : { 
        type : Number,
        require : true
    },
    price : {
        type : Number,
        require : true
    },
    code: {
        type: Number,
        require: true
    },
    img: {
        type : String,
        require : true
    }
    
});

const productModel = mongoose.model(collection,schema);

export default productModel;