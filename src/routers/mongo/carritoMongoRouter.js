const { postCarrito, getCarrito, postProductoCarrito, deleteProductoCarrito, deleteCarrito } = require('../../controllers/mongo/carritoMongo');



const { Router } = require('express');
const logRequestInfo = require('../../middlewares/logRequestInfo');

const carritoMongoRouter = Router();

carritoMongoRouter.use(logRequestInfo);

carritoMongoRouter.post('/', logRequestInfo, postCarrito);
carritoMongoRouter.delete('/:id', logRequestInfo, deleteCarrito);
carritoMongoRouter.get('/:id/productos', logRequestInfo, getCarrito);
carritoMongoRouter.post('/:id/productos', logRequestInfo, postProductoCarrito);
carritoMongoRouter.delete('/:id/productos/:id_prod', logRequestInfo, deleteProductoCarrito);

module.exports = carritoMongoRouter;
