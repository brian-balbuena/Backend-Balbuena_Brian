import { Router } from "express";

const logerRouter = Router();

logerRouter.get('/', (req, res) => {

req.logger.info('esto es un info');
req.logger.debug('esto es un debag');
req.logger.error('esto es un error');
req.logger.silly('esto es en silly')

res.send({message: 'error de prueba'})

});

export default logerRouter;