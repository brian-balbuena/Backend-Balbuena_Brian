import mongoose from "mongoose";

const cartCollection = 'carts';

const cartSchema = mongoose.Schema({
    products: {
        type: [
            {
                idProduct: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'products'
                }
                ,quantity:{
                    type: Number,
                    default: 0
                }
            }
        ],
        default: []
    }

});

cartSchema.statics.createCart = function () {
    return this.create({ products: [] });
};

export const cartModel = mongoose.model(cartCollection, cartSchema);