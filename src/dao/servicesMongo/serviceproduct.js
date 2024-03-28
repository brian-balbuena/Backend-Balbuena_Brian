
import mongoose from "mongoose";
import { productModel } from "../models/products.model.js";
import ServiceUser from "./serviceuser.js";

class ServiceProduct {

    async getProductService(limit = 10, page = 1, query = '', sort = '') {

        try {

            const [code, value] = query.split(':');


            const products = await productModel.paginate({ [code]: value }, {
                limit,
                page,
                sort: sort ? { price: sort } : {}
            });

            products.payload = products.docs;
            delete products.docs;

            return { message: 'OK', ...products }
        } catch (error) {
            console.error(error);
            return res.status(400).send({ message: 'products not found' })
        }
    };

    async getProductIdService(pId) {

        try {

            const productId = await productModel.findOne({ _id: pId });

            if(productId === null){
                return { status: (400), send: ({ message: 'products not found' }) };
            }
            return { status: (200), send: ({ productId }) };
        } catch (error) {
            console.error(error);
            return { status: (400), send: ({ message: 'products not found' }) };
        }
    };

    async addProductService(title, description, price, code, stock, category, email) {

        try {
            
            let owner = "admin"
            if(email != "") {               
                const serviceUser = new ServiceUser();
                const idUser = await serviceUser.idUser(email);
               
                if(idUser.status != 200){
                    return { status: (400), error: error, send: ({ message: 'Could not create a product' }) };
                };
                owner = idUser.id;
            };
            
            await productModel.create({ title, description, price, code, stock, category, owner});
            return { status: (201), send: ({ message: 'Product created' }) };

        } catch (error) {
            console.error(error);
            return { status: (400), error: error, send: ({ message: 'Could not create a product' }) };
        }
    };

    async updateProductService(pId, infoNew) {
        try {
            const productUpdate = await productModel.updateOne({ _id: pId }, infoNew);

            if (!productUpdate.modifiedCount) {
                return { status: (404), send: ({ message: 'Product not found' }) };
            }
            return { status: (200), send: ({ message: 'Product updated' }) };
        } catch (error) {
            console.error(error);
            return { status: (400), error: error, send: ({ message: 'could not update product' }) };
        }
    };

    async deleteProductService(pId) {

        try {
            if (pId.length !== 24) {
                return {status:(404), send:({ message: 'Product not found' })};
            
            } else {
                const objectId =new  mongoose.Types.ObjectId(pId);
                const productDeleted = await productModel.deleteOne({ _id: objectId});
                if (!productDeleted.deletedCount) {
                    return {status:(404), send:({ message: 'Product not found' })};
                };
                return {status:(200), send:({ message: 'product deleted' })};
            }
            
        } catch (error) {
            console.error(error);
            return {status:(400), error: error, send:({ message: 'could not delete product' })};
        }
    };
}

export default ServiceProduct;