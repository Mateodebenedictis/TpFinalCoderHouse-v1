const { postCarrito, getCarrito, postProductoCarrito, deleteProductoCarrito, deleteCarrito } = require('../../controllers/firebase/carritoFirebase');

const { Router } = require('express');
const logRequestInfo = require('../../middlewares/logRequestInfo');

const carritoFirebaseRouter = Router();

carritoFirebaseRouter.use(logRequestInfo);

carritoFirebaseRouter.post('/', logRequestInfo, postCarrito);
carritoFirebaseRouter.delete('/:id', logRequestInfo, deleteCarrito);
carritoFirebaseRouter.get('/:id/productos', logRequestInfo, getCarrito);
carritoFirebaseRouter.post('/:id/productos', logRequestInfo, postProductoCarrito);
carritoFirebaseRouter.delete('/:id/productos/:id_prod', logRequestInfo, deleteProductoCarrito);

module.exports = carritoFirebaseRouter;