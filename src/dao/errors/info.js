export const getProductError = (id = "") => {

    return `
    No product found.
    The product with id: ${id} was not found
    
    `;
};

export const createProductError = () => {

    return `
    the product was not created
    
    `;
};

export const deletedProductError = (id) => {

    return `
    The product with id:${id} was not found
    `;

};

export const updateProductError = (id) => {

    return `
    The product with id:${id} was not found
    `;
};

export const addProductToCartError = (cId, pId) => {

    return `
    It was not possible to add the product with id:${pId} to the cart with id:${cId}
    `;
}