import ServiceProduct from "../servicesMongo/serviceproduct.js";
const serviceproduct = new ServiceProduct();


class CartDTO {


    async cartPurchaseDTO(outOfStock, id) {

        let responses = await Promise.all(outOfStock.map(async element => {
            const product = await serviceproduct.getProductIdService(element.ID);
            const { send: { productId: { title } } } = product;
            const response = {
                title: title,
                quantity: element.QUANTITY
            };

            return response;
        }));
        responses = { ...responses, id: id }

        return responses;
    }
};

export default CartDTO;