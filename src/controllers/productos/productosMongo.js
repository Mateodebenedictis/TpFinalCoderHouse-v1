const ProductoMongoContainer = require('../../containers/ProductoMongoContainer');

const Producto = new ProductoMongoContainer();

const getProducto = (req, res) => {

    if (!req.params.id) {

        Producto.get()
            .then(productos => {

                console.log(productos)
                res.json(productos);
            })
            .catch(err => {
                res.json(err);
            })

    } else {

        Producto.get(req.params.id)
            .then(producto => {
                res.json(producto);
            })
            .catch(err => {
                res.json(err);
            })
    }
}

const postProducto = (req, res) => {

    const newProducto = {
        timestamp: Date.now(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        precio: req.body.precio,
        foto: req.body.foto,
        stock: req.body.stock,
    }

    console.log(newProducto)

    Producto.add(newProducto)
        .then(id => {
            res.json({ id: id });
        })
        .catch(err => {
            res.json(err);
        })
}

const updateProducto = (req, res) => {

    const producto = {
        timestamp: Date.now(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        precio: req.body.precio,
        foto: req.body.foto,
        stock: req.body.stock,
    }

    Producto.update(req.params.id, producto)
        .then(id => {
            res.json({ id: id });
        })
        .catch(err => {
            res.json(err);
        })
}

const deleteProducto = (req, res) => {

    Producto.delete(req.params.id)
        .then(id => {
            res.json({ id: id });
        })
        .catch(err => {
            res.json(err);
        })
}

module.exports = {
    getProducto,
    postProducto,
    updateProducto,
    deleteProducto
}