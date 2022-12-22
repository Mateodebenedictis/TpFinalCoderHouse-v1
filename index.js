const express = require('express');
const path = require('path');

//Utilizamos Mongo DB
const productosMongoRouter = require('./src/routers/mongo/productosMongoRouter');
const carritoMongoRouter = require('./src/routers/mongo/carritoMongoRouter');

//Utilizamos Firebase
const productosFirebaseRouter = require('./src/routers/firebase/productosFirebaseRouter');
const carritoFirebaseRouter = require('./src/routers/firebase/carritoFirebaseRouter');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Extiendo las rutas a /firebase y /mongo para poder utilizarlas
//Mongo DB
app.use('/api/mongo/productos', productosMongoRouter);
app.use('/api/mongo/carrito', carritoMongoRouter);

//Firebase
app.use('/api/firebase/productos', productosFirebaseRouter);
app.use('/api/firebase/carrito', carritoFirebaseRouter);


app.use((req, res) => {
  res.status(404).json({
    error: -2,
    descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada`,
  });
});


app.listen(port, () => {
  console.log(`RUN http://localhost:${port}`);
});