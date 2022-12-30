const FirebaseContainer = require('../../containers/FirebaseContainer');

const Carrito = new FirebaseContainer();
const Producto = new FirebaseContainer();


const postCarrito = (req, res) => {
    Carrito.add('carritos', {})
        .then(id => {
            res.json({ id: id });
        })
        .catch(err => {
            res.json(err);
        })
}

const getCarrito = (req, res) => {
    Carrito.get('carritos', req.params.id)
        .then(carrito => {
            
            console.log('carrito : ' + JSON.stringify(carrito));

            if(Object.keys(carrito).length !== 0) {

                let idsProductos = carrito.productos;

                Producto.get('productos', idsProductos)
                    .then(productos => {
                        carrito.productos = productos;
                        console.log('carrito : ' + JSON.stringify(carrito))
                        res.json({ carrito: carrito });
                    })
                    .catch(err => {
                        res.json(err);
                    })

            } else {
                res.json(carrito);
            }
        })
        .catch(err => {
            res.json(err);
        })
}

const postProductoCarrito = (req, res) => {

    const idProducto = req.body.id;
    const idCarrito = req.params.id;

    Carrito.get('carritos', idCarrito)
        .then(carrito => {

            console.log('carrito : ' + JSON.stringify(carrito));

            if (Object.keys(carrito).length !== 0) {

                const productos = carrito.productos;
                const producto = productos.find(producto => producto === idProducto);

                if (producto) {

                    res.json({ error: 'El producto ya existe en el carrito' });
                }

            } else {
                
                Carrito.add('carritos', idProducto, idCarrito)
                .then(id => {
                    res.json({ id: id });
                })
                .catch(err => {
                    res.json(err);
                })

            }
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
            res.json({ id: id });
        })
        .catch(err => {
            res.json(err);
        })
}

const deleteCarrito = (req, res) => {
    Carrito.delete('carritos', req.params.id)
        .then(id => {
            res.json({ id: id });
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

