const database = process.env.DATABASE;

const productos = (database == 'firebase') ? '../controllers/productos/productosFirebase' : '../controllers/productos/productosMongo';

const { getProducto, postProducto, updateProducto, deleteProducto } = require(productos);

const { Router } = require('express');
const validateAdmin = require('../middlewares/validAdmin');
const logRequestInfo = require('../middlewares/logRequestInfo');

//crear una variable admin y pasarla por parámetro en el router
const admin = true;

const productosRouter = Router();

productosRouter.get('/:id?', logRequestInfo, getProducto);
productosRouter.post('/', validateAdmin(admin), postProducto);
productosRouter.put('/:id', validateAdmin(admin), updateProducto);
productosRouter.delete('/:id', validateAdmin(admin), deleteProducto);

module.exports = productosRouter;




