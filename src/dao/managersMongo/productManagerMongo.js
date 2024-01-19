import { productModel } from "../models/products.model.js";

class ProductManagerMongo  {



    async getProduct(limit = 10, page = 1, query = '', sort = '') {

        try {

            const [code, value] = query.split(':');


            const products = await productModel.paginate({[ code ] : value},{
                limit,
                page,
                sort : sort ? { price:sort } : {}
            });

            products.payload = products.docs;
            delete products.docs;

           return {message: 'OK', ...products}
        } catch (error) {
            console.error(error);
            return res.status(400).send({message: 'products not found'})
        }
    };



    
}

export default ProductManagerMongo;