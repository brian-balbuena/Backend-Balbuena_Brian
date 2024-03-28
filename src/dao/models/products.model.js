import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
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
  ,owner: {
    type: String,
    default: "admin"
  }
  ,satatus: {
    type: Boolean,
    default: true
  }

});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);