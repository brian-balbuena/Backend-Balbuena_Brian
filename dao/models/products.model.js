import mongoose from "mongoose";

const productCollection = 'products';

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  }
  ,description: {
    type: String,
    default: '',
    required: true
  }
  ,price: Number
  ,thumbnail: {
    type: String, 
    default: "/././prueba.png"
  }
  ,code: {
    type: String,
    required: true, 
    unique: true
  }
  ,stock: Number
  ,category: {
    type: String,
    default: "generico"
  }
  ,satatus: {
    type: Boolean,
    default: true
  }

});

export const productModel = mongoose.model(productCollection, productSchema);