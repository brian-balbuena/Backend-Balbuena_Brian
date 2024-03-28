import express, { response } from 'express';
import handlebars from 'express-handlebars'
import { Server, Socket } from 'socket.io';

import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewRouters from './routes/views.routes.js';
import sessionRoutes from './routes/session.routes.js';
import userSRouter from './routes/users.routes.js';
import logerRouter from './routes/loggerTest.router.js';
import mailingRouter from './routes/mailing.routes.js';
import mongoose from 'mongoose';

import { productModel } from '../src/dao/models/products.model.js';
import { messageModel } from '../src/dao/models/messages.model.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import initializePassport from './configs/passport.config.js';
import { Command } from 'commander'
import { getVariables } from './configs/config.js';
import { ErrorHandler } from './middlewares/error.js';
import { addLogger } from './utils/logger.js';




const program = new Command();
program.option('--mode <mode>', 'Modo de trabajo', 'production');
const option = program.parse();
const { port , mongoURL, secret, work_environment,mailing_user, mailing_service,  mailing_password} = getVariables(option);

export const mailingConfig = {
 user: mailing_user,
 service: mailing_service,
 password: mailing_password
};
const app = express();
/* const PORT = 8080; */

app.use(session({
    secret: secret,
    store: MongoStore.create({
        mongoUrl: mongoURL
    }),
    resave: true,
    saveUninitialized: true
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

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

mongoose.connect(mongoURL);

app.use(addLogger(work_environment))
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/session', sessionRoutes);
app.use('/api/users', userSRouter);
app.use('/', viewRouters);
app.use('/loggerTest', logerRouter);
app.use('/api/mailing', mailingRouter);
app.use(ErrorHandler);

const httpServer = app.listen(port, () => {
    console.log(`Seervidor en puerto ${port}`);
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

async function postMessages(message) {
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

