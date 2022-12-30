const FirebaseContainer = require('../../containers/FirebaseContainer');

const Producto = new FirebaseContainer();


const getProducto = (req, res) => {

    if (!req.params.id) {

        Producto.get('productos')
            .then(productos => {
                res.json(productos);
            })
            .catch(err => {
                res.json(err);
            })
            
    } else {

        Producto.get('productos', req.params.id)
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
        timestamp : Date.now(),
        nombre : req.body.nombre,
        descripcion : req.body.descripcion,
        codigo : req.body.codigo,
        precio : req.body.precio,
        foto : req.body.foto,
        stock : req.body.stock,
    }

    Producto.add('productos', newProducto)
        .then(id => {
            res.json({id: id});
        })
        .catch(err => {
            res.json(err);
        })
}

const updateProducto = (req, res) => {
    
    const producto = {
        timestamp : Date.now(),
        nombre : req.body.nombre,
        descripcion : req.body.descripcion,
        codigo : req.body.codigo,
        precio : req.body.precio,
        foto : req.body.foto,
        stock : req.body.stock,
    }

    Producto.update('productos', req.params.id, producto)
        .then(id => {
            res.json({id: id});
        })
        .catch(err => {
            res.json(err);
        })
}

const deleteProducto = (req, res) => {
    Producto.delete('productos', req.params.id)
        .then(id => {
            res.json({id: id});
        })
        .catch(err => {
            res.json(err);
        })
}


module.exports = {
    getProducto,
    postProducto,
    updateProducto,
    deleteProducto,
};
