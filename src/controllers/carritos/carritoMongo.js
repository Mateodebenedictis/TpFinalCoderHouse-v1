const CarritoMongoContainer = require('../../containers/CarritoMongoContainer');
const ProductoMongoContainer = require('../../containers/ProductoMongoContainer');

const Carrito = new CarritoMongoContainer();
const Producto = new ProductoMongoContainer();

const postCarrito = (req, res) => {
    Carrito.add()
        .then(id => {
            res.json({id: id});
        })
        .catch(err => {
            res.json(err);
        })
}

const getCarrito = (req, res) => {

    Carrito.get(req.params.id)
        .then(carrito => {
            
            let idsProductos = carrito.productos.map(prod => prod.toString());

            Producto.get(idsProductos)
                .then(productos => {
                    carrito.productos = productos;
                    console.log('carrito : ' + carrito)
                    res.json({carrito: carrito});
                })
                .catch(err => {
                    res.json(err);
                })
        })
        .catch(err => {
            res.json(err);
        })
}

const postProductoCarrito = (req, res) => {

    const idProducto = req.body._id;
    const idCarrito = req.params.id;

    //verificar que el producto no exista en el carrito

    Carrito.get(idCarrito)

        .then(carrito => {
            if (carrito.productos.find(prod => prod._id == idProducto)) {
    
                res.json({error: 'El producto ya existe en el carrito'});
    
            } else {
    
                Carrito.add(idProducto, idCarrito)
                    .then(id => {
                        res.json({id: id});
                    })
                    .catch(err => {
                        res.json(err);
                    })
            }

        })
        .catch(err => {
            res.json(err);
        }
    )

}

const deleteProductoCarrito = (req, res) => {
    const idProducto = req.params.id_prod;
    const idCarrito = req.params.id;

    Carrito.delete(idCarrito, idProducto)
        .then(id => {
            res.json({id: id});
        })
        .catch(err => {
            res.json(err);
        })
}

const deleteCarrito = (req, res) => {
    Carrito.delete(req.params.id)
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


