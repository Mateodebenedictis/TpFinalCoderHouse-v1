const database = process.env.DATABASE;

const carrito = (database == 'firebase') ? '../controllers/carritos/carritoFirebase' : '../controllers/carritos/carritoMongo';

const { postCarrito, getCarrito, postProductoCarrito, deleteProductoCarrito, deleteCarrito } = require(carrito);

const { Router } = require('express');
const logRequestInfo = require('../middlewares/logRequestInfo');

const carritoRouter = Router();

carritoRouter.use(logRequestInfo);

carritoRouter.post('/', logRequestInfo, postCarrito);
carritoRouter.delete('/:id', logRequestInfo, deleteCarrito);
carritoRouter.get('/:id/productos', logRequestInfo, getCarrito);
carritoRouter.post('/:id/productos', logRequestInfo, postProductoCarrito);
carritoRouter.delete('/:id/productos/:id_prod', logRequestInfo, deleteProductoCarrito);

module.exports = carritoRouter;