const { Producto } = require('../database/models');

class ProductoMongoContainer {
    constructor() {
        this.productos = [];
    }

    async get(id) {
        
        if (id) {

            const productos = await Producto.find({ '_id': { $in: id } }, (err, productos) => {
                    if (err) {
                    return err;
                }
                return productos;
            }).clone().catch(function(err){ console.log(err)});
            return productos;
            
        }

        const productos = await Producto.find({}, (err, productos) => {
            if (err) {
                return err;
            }
            return productos;
        }).clone().catch(function(err){ console.log(err)});
        return productos;
    }

    async add(data) {
        const producto = new Producto({ timestamp: data.timestamp, nombre: data.nombre, descripcion: data.descripcion, codigo: data.codigo, foto: data.foto, precio: data.precio, stock: data.stock });
        await producto.save(function (err) {
            if (err) {
                return err;
            }
        });
        return producto._id;
    }

    async update(id, data) {
        const producto = await Producto().findById(id, (err, producto) => {
            if (err) {
                return err;
            }
            return producto;
        }).clone().catch(function(err){ console.log(err)});

        producto.nombre = data.nombre;
        producto.descripcion = data.descripcion;
        producto.codigo = data.codigo;
        producto.foto = data.foto;
        producto.precio = data.precio;
        producto.stock = data.stock;

        await producto.save();
        return producto;
    }

    async delete(id) {
        const producto = await Producto.findByIdAndDelete(id, (err, producto) => {
            if (err) {
                return err;
            }
            return producto;
        }).clone().catch(function(err){ console.log(err)});
        return producto._id;
    }

}

module.exports = ProductoMongoContainer;