import express, { response } from 'express';
import handlebars from 'express-handlebars'
import { Server, Socket } from 'socket.io';

import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewRouters from './routes/views.routes.js';
import sessionRoutes from './routes/session.routes.js';
import mongoose from 'mongoose';
/* import { productModel } from './dao/models/products.model.js'; */
import { productModel } from '../src/dao/models/products.model.js';
import { messageModel } from '../src/dao/models/messages.model.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';



const app = express();
const PORT = 8080;

app.use(session({
    secret: 'c0d3rh0us3',
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://brian:brian10674@ecommercemiplanta.kjf5njt.mongodb.net/ecommerce',
        ttl: 20
    }),
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
});

app.engine('handlebars', hbs.engine);
app.set('views', 'src/views');
app.set('view engine', 'handlebars');

mongoose.connect('mongodb+srv://brian:brian10674@ecommercemiplanta.kjf5njt.mongodb.net/ecommerce');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/session', sessionRoutes);
app.use('/', viewRouters);


const httpServer = app.listen(PORT, () => {
    console.log(`Seervidor en puerto ${PORT}`);
});

const io = new Server(httpServer);


async function getProducts() {
    try {
        const productos = await productModel.find();
        return productos;
    } catch (error) {
        console.error(error);
        return { mensaje: 'Products not found' };
    }
}
/* const message = [] */
async function getMessages() {
    try {
        const messages = await messageModel.find();
        return messages;
    } catch (error) {
        console.error(error);
        return { mensaje: 'Message not found' };
    }
};

async function postMessages(message){
try {
    await messageModel.create(message);
    /* res.status(201).send({message: 'saved message'}) */
} catch (error) {
    console.error(error);
    /* res.status(400).send({message: 'error saving mesage'}) */
}
};


io.on('connect', async socket => {
    try {

        const datosDeProductos = await getProducts();
        io.emit('productsRealtime', datosDeProductos);

        const changeStream = productModel.watch();
        changeStream.on('change', async (change) => {
            const products = await getProducts();

            io.emit('productsRealtime', products);
        });
    } catch (error) {
        console.error('Error al manejar la conexión de socket:', error);
    }

    

    socket.on('userMessage', async data => {
       try {
        const saveMessage = await postMessages(data);
        const messages = await getMessages();
        io.emit('setMessages', messages)

       } catch (error) {
        console.error(error);
        io.emit('setMessages', 'NOT FOUND')
       }
        
    });
});

