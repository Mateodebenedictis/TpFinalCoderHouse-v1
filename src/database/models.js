const {Schema, model} = require("mongoose");

const productoSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    codigo: {
        type: String,
        required: true,
    },
    foto: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
});

const carritoSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    productos: [{ type: Schema.Types.ObjectId, ref: "Producto" }],
});

const Producto = model("Producto", productoSchema);
const Carrito = model("Carrito", carritoSchema);


module.exports = {
    Producto,
    Carrito,
}