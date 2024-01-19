import { cartModel } from "../models/carts.model.js";


class CartManagerMongo  {



/*     async getProduct(limit = 10, page = 1, query = '', sort = '') {

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
    }; */

    async getCart(id){
        try {
            
            const productsCart = await cartModel.findOne({ _id: id }).populate('products.idProduct');
            const productsRender = productsCart.products
            return {
                message: 'ok',
                products: productsRender
            }

        } catch (error) {
            console.error(error);
            return res.status(400).send({message: 'products not found'})
        }
    };

    
}

export default CartManagerMongo;