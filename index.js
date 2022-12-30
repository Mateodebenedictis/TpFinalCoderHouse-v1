require('dotenv').config();
const express = require('express');
const {mongoDbConnection} = require('./src/database/config');
const path = require('path');

//Conectamos a Mongo DB
mongoDbConnection();

//Import dinamico de router
const carritoRouter = require('./src/routers/carritoDinamico');
const productosRouter = require('./src/routers/productosDinamico');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/carrito', carritoRouter);
app.use('/api/productos', productosRouter);


app.use((req, res) => {
  res.status(404).json({
    error: -2,
    descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada`,
  });
});


app.listen(port, () => {
  console.log(`RUN http://localhost:${port}`);
});