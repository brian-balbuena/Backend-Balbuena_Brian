import CartDTO from "../dao/dtos/carts.dto.js";
import TicketDTO from "../dao/dtos/ticket.dto.js";
import UserDTO from "../dao/dtos/user.dto.js";
import ErrorEnum from "../dao/errors/error.enum.js";
import { addProductToCartError } from "../dao/errors/info.js";
import ServiceCart from "../dao/servicesMongo/servicecart.js";
import { updateStockProduct } from "./stock.controller.js";
import { createTicket } from "./ticket.controller.js";
import CustomErrors from "../dao/errors/customErrors.js";

const serviceCart = new ServiceCart();
const cartDto = new CartDTO();

export const getCartId = async (req, res) => {

    const { cId } = req.params;

    const productCart = await serviceCart.getCartIdService(cId);

    if (productCart.status === 200) {
        res.render('cart', productCart);
    } else {
        res.render('fail');
    }

};

export const getCartIdApi = async (req, res) => {

    const { cId } = req.params;

    const productCart = await serviceCart.getCartIdService(cId);

    return res.status(productCart.status).send(productCart.send);
};

export const getCartApi = async (req, res) => {

    const carts = await serviceCart.getCartService();

    return res.status(carts.status).send(carts.send);

};

export const createCartApi = async (req, res) => {

    const createCart = await serviceCart.createCartService();

    return res.status(createCart.status).send(createCart.send);

};

export const addProductToCartApi = async (req, res, next) => {

    const { cId, pId } = req.params;
    const { quantity = 1 } = req.body;

    const addProduct = await serviceCart.addProductToCartService(cId, pId, quantity);

    if(addProduct.status === 200){
        return res.status(addProduct.status).send(addProduct.send);
    }else{
        try {

            throw CustomErrors .createError({
                name: 'Could not be added to cart',
                cause: addProductToCartError(cId, pId),
                message: `Product with id:${pId} could not be added to cart`,
                code: ErrorEnum.UPDATE_ERROR
            });
        } catch (error) {
            next(error);
        }
        return;
    }
   

};

export const editCartApi = async (req, res) => {

    const { cId } = req.params;
    const cartBody = req.body;

    const editCart = await serviceCart.editCartService(cId, cartBody);

    return res.status(editCart.status).send(editCart.send);
};

export const editProductToCartApi = async (req, res) => {

    const { cId, pId } = req.params;
    const { quantity } = req.body;


    const editProduct = await serviceCart.editProductToCartService(cId, pId, quantity);

    return res.status(editProduct.status).send(editProduct.send);
};

export const deleteCartApi = async (req, res) => {

    const { cId } = req.params;
    const deleteCart = await serviceCart.deleteCartService(cId);

    return res.status(deleteCart.status).send(deleteCart.send);

};

export const deleteProductToCartApi = async (req, res) => {

    const { cId, pId } = req.params;

    const deleteProduct = await serviceCart.deleteProductToCartService(cId, pId);

    return res.status(deleteProduct.status).send(deleteProduct.send);

};

export const purchase = async (req, res) => {

    const { cId } = req.params;
    const { user } = req.session;
    const userDTO = new UserDTO(user);

    const checkStock = await serviceCart.checkStockProductToCartService(cId);

    if (checkStock.stock.length === 0) {
        const productDto = await cartDto.cartPurchaseDTO(checkStock.outOfStock, cId);
        const { id, ...outOfStock } = productDto;

        res.render('failPurchaseStock', { outOfStock: outOfStock, id: id, firstName: userDTO.first_name, lastName: userDTO.last_name, role: userDTO.role, });
    } else {

        const ticket = await createTicket(req, res, checkStock.stock);

        if (ticket.status != 201) {
            res.render('failPurchase', { firstName: userDTO.first_name, lastName: userDTO.last_name, role: userDTO.role, });
        } else {

            checkStock.stock.forEach(async product => {
                const stock = product.STOCK - product.QUANTITY;
                const newStock = {
                    stock: stock
                };

                const updateStock = await updateStockProduct(product.ID, newStock);
                /*   FALTARIA MANEJAR EL ERROR  AL EDITAR STOCK */
            })

            const empty = await emptyCart(cId);
           
            checkStock.outOfStock.forEach(async product => {

                const editCart = await editCartPurchase(cId, product.ID, product.QUANTITY);
            })
            

            const ticketDTO = new TicketDTO(ticket.ticket.code, ticket.ticket.amount, ticket.ticket.purchaser, ticket.ticket.purchase_datetime)
            res.render('ticket', {id: cId, firstName: userDTO.first_name, lastName: userDTO.last_name, role: userDTO.role, ticketDTO });

        }
    }


};

const emptyCart = async (id) => {

    const deleteCart = await serviceCart.deleteCartService(id);

    return {
        status: deleteCart.status,
        send: deleteCart.send
    };
};

const editCartPurchase = async (cId, pId,  quantity) => {


    const addProduct = await serviceCart.addProductToCartService(cId, pId, quantity);

    return {
        status: addProduct.status,
        send: addProduct.send
    };
};