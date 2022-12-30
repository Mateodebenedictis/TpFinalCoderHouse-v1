const { Carrito } = require('../database/models');

class CarritoMongoContainer {

    constructor() {
        this.carritos = [];
    }

    async get(id, productId) {
        if(productId){
            const carrito = await Carrito.findById(id, (err, carrito) => {
                if (err) {
                    return err;
                }
                return carrito;
            }).clone().catch(function(err){ console.log(err)});
            const producto = carrito.productos.find(producto => producto._id == productId);
            return producto;
        }

        const carrito = await Carrito.findById(id, (err, carrito) => {
            if (err) {
                return err;
            }
            return carrito;
        }).clone().catch(function(err){ console.log(err)});
        return carrito;
    }


    //el metodo add solo debe devolver el id del carrito o producto agregado
    async add(data, id) {
        
        if(id){
            const carrito = await Carrito.findById(id, (err, carrito) => {
                if (err) {
                    return err;
                }
                return carrito;
            }).clone().catch(function(err){ console.log(err)});

            carrito.productos.push(data);
            await carrito.save();
            return carrito._id;
        }

        const carrito = new Carrito(data);
        await carrito.save();
        return carrito._id;
    }

    async delete(id, productId) {

        if(productId){
            const carrito = await Carrito.findById(id, (err, carrito) => {
                if (err) {
                    return err;
                }
                return carrito;
            }).clone().catch(function(err){ console.log(err)});

            const producto = carrito.productos.find(producto => producto._id == productId);
            const index = carrito.productos.indexOf(producto);
            carrito.productos.splice(index, 1);
            await carrito.save();
            return carrito;
        }

        const carrito = await Carrito.findByIdAndDelete(id, (err, carrito) => {
            if (err) {
                return err;
            }
            return carrito;
        }).clone().catch(function(err){ console.log(err)});
        return carrito;
    }
}

module.exports = CarritoMongoContainer;