const database = [
    {
        "id" : 1,
        "timestamp" : 1669649480000,
        "nombre" : "Escuadra",
        "descripcion" : "Medidora de ángulos rectos",
        "codigo" : "12345678",
        "foto" : "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        "precio" : 123.45,
        "stock" : 10
    },
    {
        "id" : 2,
        "timestamp" : 1669649470000,
        "nombre" : "Calculadora",
        "descripcion" : "Calculadora científica",
        "codigo" : "12345679",
        "foto" : "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        "precio" : 234.56,
        "stock" : 5
    },
    {
        "id" : 3,
        "timestamp" : 16696494800100,
        "nombre" : "Globo Terráqueo",
        "descripcion" : "Globo terráqueo ilustrado",
        "codigo" : "12345680",
        "foto" : "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "precio" : 345.67,
        "stock" : 5
    }
];

const obtenerUltimoId = () => {
    const ultimoProducto = database[database.length - 1];
    return ultimoProducto.id;
}

const obtenerProducto = (id) => {
    return database.find((item) => item.id === parseInt(id))
}

const getProductos = (req, res) => {
    const id = req.params.id;

    if(id === undefined) {
        res.json(database);
    }

    const producto = obtenerProducto(id);
    if(producto === undefined) {
        res.status(404).json({error: 'Producto no encontrado'});
    } else {
        res.json(producto);
    }
};

const getProductoById = (request, res) => {
    const producto = obtenerProducto(request.params.id);
    if(producto === undefined) {
        res.json({error: 'Producto no encontrado'});
    } else {
        console.log(producto);
        res.json(producto);
    }
};

const postProducto = (request, res) => {
    const newProducto = {
        id : obtenerUltimoId() + 1,
        timestamp : Date.now(),
        nombre : request.body.title,
        descripcion : request.body.description,
        codigo : request.body.code,
        precio : request.body.price,
        foto : request.body.thumbnail,
        stock : request.body.stock,
    }

    console.log(newProducto);

    database.push(newProducto);
    res.json(newProducto);
};

const putProducto = (request, res) => {
    const producto = obtenerProducto(request.params.id);
    if(producto === undefined) {
        res.json({error: 'Producto no encontrado'});
    } else {
        producto.timestamp = Date.now();
        producto.nombre = request.body.title;
        producto.descripcion = request.body.description;
        producto.codigo = request.body.code;
        producto.precio = request.body.price;
        producto.foto = request.body.thumbnail;
        producto.stock = request.body.stock;
        res.json(producto);
    }
};

const deleteProducto = (request, res) => {
    const producto = obtenerProducto(request.params.id);
    if(producto === undefined) {
        res.json({error: 'Producto no encontrado'});
    } else {
            
        const producto = database.find((item) => item.id === parseInt(request.params.id));
        const index = database.indexOf(producto);
        database.splice(index, 1);
        res.json(producto);

    }
}

module.exports = {
    getProductos,
    getProductoById,
    postProducto,
    putProducto,
    deleteProducto,
    obtenerProducto
};
