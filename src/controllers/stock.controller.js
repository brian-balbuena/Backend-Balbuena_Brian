import ServiceProduct from "../dao/servicesMongo/serviceproduct.js";

const serviceProduct = new ServiceProduct();

export const updateStockProduct = async (pId, newStock) => {


    const updateStock = await serviceProduct.updateProductService(pId, newStock); 

    if(updateStock.status === 200){
        return {
            update: true, 
            message : updateStock.send
        }
    }else{
        return { 
            update: false,
            message: updateStock.send,
            error: updateStock.error
        }
    }
};