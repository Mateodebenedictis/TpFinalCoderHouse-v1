const MongoContainer = require('../../containers/mongo/MongoContainer');

const Carrito = new MongoContainer();
const Producto = new MongoContainer();

const postCarrito = (req, res) => {

    Carrito.add('carritos', {})
        .then(id => {
            res.json({id: id});
        })
        .catch(err => {
            res.json(err);
        })
}

const getCarrito = (req, res) => {
    Carrito.get('carritos', req.params.id)
        .then(carritos => {
            res.json(carrito);
        })
        .catch(err => {
            res.json(err);
        })
}

const postProductoCarrito = (req, res) => {
    const idProducto = req.body.id;
    const idCarrito = req.params.id;

    Producto.get('productos', idProducto)
        .then(producto => {
            Carrito.add('carritos', producto, idCarrito)
                .then(id => {
                    res.json({id: id});
                })
                .catch(err => {
                    res.json(err);
                })
        })
        .catch(err => {
            res.json(err);
        })
}

const deleteProductoCarrito = (req, res) => {
    const idProducto = req.params.id_prod;
    const idCarrito = req.params.id;

    Carrito.delete('carritos', idCarrito, idProducto)
        .then(id => {
            res.json({id: id});
        })
        .catch(err => {
            res.json(err);
        })
}

const deleteCarrito = (req, res) => {
    Carrito.delete('carritos', req.params.id)
        .then(id => {
            res.json({id: id});
        })
        .catch(err => {
            res.json(err);
        })
}



module.exports = {
    postCarrito,
    getCarrito,
    postProductoCarrito,
    deleteProductoCarrito,
    deleteCarrito
}
