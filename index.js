const express = require('express');
const path = require('path');

const productRouter = require('./src/routers/productos');
const carritoRouter = require('./src/routers/carrito');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use('/api/productos', productRouter);
app.use('/api/carrito', carritoRouter);

app.use((req, res) => {
  res.status(404).json({
    error: -2,
    descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada`,
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/static/index.html'));
})

app.listen(port, () => {
  console.log(`RUN http://localhost:${port}`);
});