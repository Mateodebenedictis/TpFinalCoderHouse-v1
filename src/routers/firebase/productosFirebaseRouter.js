const { getProducto, postProducto, updateProducto, deleteProducto } = require('../../controllers/firebase/productosFirebase');

const { Router } = require('express');
const validateAdmin = require('../../middlewares/validAdmin');

//crear una variable admin y pasarla por parámetro en el router
const admin = true;

const productosFirebaseRouter = Router();

productosFirebaseRouter.get('/:id?', getProducto);
productosFirebaseRouter.post('/', validateAdmin(admin), postProducto);
productosFirebaseRouter.put('/:id', validateAdmin(admin), updateProducto);
productosFirebaseRouter.delete('/:id', validateAdmin(admin), deleteProducto);

module.exports = productosFirebaseRouter;