const FirebaseContainer = require('../../containers/firebase/FirebaseContainer');

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
        id : 0,
        timestamp : Date.now(),
        nombre : request.body.nombre,
        descripcion : request.body.descripcion,
        codigo : request.body.codigo,
        precio : request.body.precio,
        foto : request.body.foto,
        stock : request.body.stock,
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
        id : 0,
        timestamp : Date.now(),
        nombre : request.body.nombre,
        descripcion : request.body.descripcion,
        codigo : request.body.codigo,
        precio : request.body.precio,
        foto : request.body.foto,
        stock : request.body.stock,
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
