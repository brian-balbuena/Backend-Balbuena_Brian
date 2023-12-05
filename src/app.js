import express from 'express';
import { ProductManager } from './productManager.js';

const app = express();
const PORT = 8080;

const productManager = new ProductManager('../db_Productos.json');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/products', async (req, res) => {
    const { limit } = req.query;

    if(!limit){
        const products = await productManager.getProducts();
        res.send(products);
        return; //finalizo la ejecucion 
    }
    
    const products = await productManager.getProducts()
    if( limit > products.length || limit == 0){
        res.send('Error en el limite');
        return; //finalizo la ejecucion 
    }
  
    const productsLimit = products.slice(0, limit);   
    res.send(productsLimit);
    return; //finalizo la ejecucion 
});

app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;

    const productId = await productManager.getProductById(+pid);

    if(productId === undefined){
        return res.send({message: 'invalid id'});
    }

    res.send(productId);
});

app.listen(PORT, () => {
    console.log(`Seervidor en puerto ${PORT}`);
});
