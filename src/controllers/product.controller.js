import UserDTO from "../dao/dtos/user.dto.js";
import CustomErrors from "../dao/errors/customErrors.js";
import ErrorEnum from "../dao/errors/error.enum.js";
import { createProductError, getProductError } from "../dao/errors/info.js";
import { generateProductMocking, generateUserMocking } from "../dao/servicesMocking/servicesProductMocking.js";
import ServiceProduct from "../dao/servicesMongo/serviceproduct.js";


export const getProduct = async (req, res) => {
    const { limit = 10, page = 1, query = '', sort = '' } = req.query;
    const { user } = req.session;
    const userDTO = new UserDTO(user);

    try {
        const serviceProduct = new ServiceProduct();

        const products = await serviceProduct.getProductService(limit, page, query, sort);

        if (products) {
            res.render('products', { products, firstName: userDTO.first_name, lastName: userDTO.last_name, role: userDTO.role });
        } else {
            res.status(400).send({ message: 'product not found' })
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: 'product not found' })
    }

};

export const getApiProduct = async (req, res) => {

    const { limit = 10, page = 1, query = '', sort = '' } = req.query;
    const { user } = req.session;
    const userDTO = new UserDTO(user);


    try {
        const serviceProduct = new ServiceProduct();

        const products = await serviceProduct.getProductService(limit, page, query, sort);

        if (products) {
            res.render('products', { products, firstName: userDTO.first_name, lastName: userDTO.last_name, role: userDTO.role });
        } else {
            res.status(400).send({ message: 'product not found' })
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: 'product not found' })
    }
};

export const getApiProductId = async (req, res, next) => {

    const { pid } = req.params;

    try {
        const serviceProduct = new ServiceProduct();
        const productId = await serviceProduct.getProductIdService(pid);

        if (productId.status === 400) {
            return CustomErrors.createError({
                name: 'The product was not found',
                cause: getProductError(pid),
                message: 'Error when obtaining the product',
                code: ErrorEnum.READ_ERROR
            });
        }
        return res.status(200).send({ productId });
    } catch (error) {
        console.error(error);
        /*  res.status(400).send({ error }); */
        next(error);
    }
};

export const addApiProduct = async (req, res, next) => {

    const { title, description, price, code, stock, category } = req.body;

    if (!title || !description || !price || !code || !stock || !category) {
        /*   return res.status(400).send({ message: 'Product incomplete' }); */
        console.log('1')
        return CustomErrors.createError({
            name: 'the product was not created',
            cause: getProductError(33),
            message: 'Product incomplete',
            code: ErrorEnum.CREATE_ERROR
        });
    };


    const serviceProduct = new ServiceProduct();
    const response = await serviceProduct.addProductService(title, description, price, code, stock, category);

    if (response.status === 201) {
        res.status(201).send({ message: 'Product created' });
    } else {
        /*      console.error(response.error);
             res.status(400).send({ message: 'Could not create a product' }); */
        console.log('2')
        const error = CustomErrors.createError({
            name: 'the product was not created',
            cause: createProductError(),
            message: 'Error when trying to create a product',
            code: ErrorEnum.CREATE_ERROR
        });
        next(error);
    }

};

export const updateApiProduct = async (req, res) => {

    const { pId } = req.params;
    const infoNew = req.body;

    const serviceProduct = new ServiceProduct();
    const productUpdate = await serviceProduct.updateProductService(pId, infoNew);

    if (productUpdate.status === 200) {
        return res.status(200).send({ message: 'Product updated' });
    } else {
        return res.status(productUpdate.status).send(productUpdate.send);
    }

};

export const deleteApiProduct = async (req, res) => {

    const { pId } = req.params;

    const serviceProduct = new ServiceProduct();
    const productDeleted = await serviceProduct.deleteProductService(pId);

    if (productDeleted.status === 200) {
        return res.status(200).send({ message: 'product deleted' });
    } else {
        return res.status(productDeleted.status).send(productDeleted.send);
    }
};

export const getMokingProducts = (req, res) => {
    const user = generateUserMocking();

    const products = {
        payload: []
    };

    for (let i = 0; i < 100; i++) {
        products.payload.push(generateProductMocking())
    }

    res.render('products', { products, firstName: user.firstName, lastName: user.lastName, role: user.role });

};