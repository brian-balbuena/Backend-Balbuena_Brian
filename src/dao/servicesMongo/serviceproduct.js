import { productModel } from "../models/products.model.js";

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
            return { status: (200), send: ({ productId }) };
        } catch (error) {
            console.error(error);
            return { status: (400), send: ({ message: 'products not found' }) };
        }
    };

    async addProductService(title, description, price, code, stock, category) {

        try {
            await productModel.create({ title, description, price, code, stock, category });
            return { status: (201), send: ({ message: 'Product created' }) };

        } catch (error) {
            console.log(`errorrrr`)
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
            const productDeleted = await productModel.deleteOne({ _id: pId });

            if (!productDeleted.deletedCount) {
                return {status:(404), send:({ message: 'Product not found' })};
            };
            return {status:(200), send:({ message: 'product deleted' })};
        } catch (error) {
            console.error(error);
            return {status:(400), error: error, send:({ message: 'could not delete product' })};
        }
    };
}

export default ServiceProduct;