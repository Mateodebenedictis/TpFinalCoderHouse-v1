const { obtenerProducto } = require('./producto');
const Carrito = require('../containers/Carrito');

const database = [
    {
      "id" : 1, 
      "timestamp" : "1669649480131",
      "productos" : [
        {
            "id" : 1,
            "timestamp" : "1669649480000",
            "nombre" : "Escuadra",
            "descripcion" : "Medidora de ángulos rectos",
            "codigo" : "12345678",
            "foto" : "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
            "precio" : 123.45,
            "stock" : 10
        },
        {
            "id" : 2,
            "timestamp" : "1669649470000",
            "nombre" : "Calculadora",
            "descripcion" : "Calculadora científica",
            "codigo" : "12345679",
            "foto" : "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
            "precio" : 234.56,
            "stock" : 5
        },
      ]
    },
    {
        "id" : 2,
        "timestamp" : "1669649480145",
        "productos" : [
            {
                "id" : 3,
                "timestamp" : "16696494800100",
                "nombre" : "Globo Terráqueo",
                "descripcion" : "Globo terráqueo ilustrado",
                "codigo" : "12345680",
                "foto" : "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
                "precio" : 345.67,
                "stock" : 5
            }
        ]
    }
];

const contenedorCarrito = new Carrito('carrito.txt');
contenedorCarrito.checkIfFileExists();

database.forEach(carrito => {
    contenedorCarrito.save(carrito);
});

const postCarrito = () => {
    return contenedorCarrito.postCarrito();
}

const deleteCarrito = (id) => {
    return contenedorCarrito.deleteCarrito(id);
}

const getProductosCarrito = (id) => {
    return contenedorCarrito.getProductosCarrito(id);
}

const postProductoCarrito = (idCarrito, idProducto) => {
    return contenedorCarrito.postProductoCarrito(idCarrito, idProducto);
}

const deleteProductoCarrito = (idCarrito, idProducto) => {
    return contenedorCarrito.deleteProductoCarrito(idCarrito, idProducto);
}


module.exports = {
    postCarrito,
    deleteCarrito,
    getProductosCarrito,
    postProductoCarrito,
    deleteProductoCarrito
}