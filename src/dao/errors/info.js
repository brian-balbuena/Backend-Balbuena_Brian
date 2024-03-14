export const getProductError =  (id = "") => {

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