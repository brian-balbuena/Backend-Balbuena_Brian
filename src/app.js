import express from 'express';
import handlebars from 'express-handlebars'
import { Server, Socket } from 'socket.io';

import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewRouters from './routes/views.routes.js';
import ProductManager from './productManager.js';

const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine());
app.set('views', 'src/views');
app.set('view engine', 'handlebars');


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewRouters);


const httpServer =  app.listen(PORT, () => {
    console.log(`Seervidor en puerto ${PORT}`);
});

const io = new Server(httpServer);

const productManager = new ProductManager('./db_Productos.json');
io.on('connect', async socket => {
    io.emit('productsRealtime', await productManager.getProducts());

    socket.on('message', data => {
        mensaje.push(data);
        io.emit('messagePrueba', mensaje);
    });
});