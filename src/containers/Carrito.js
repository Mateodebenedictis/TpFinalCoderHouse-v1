const fs=require('fs');


class Carrito {
    constructor() {
        this.nombreArchivo = nombreArchivo;
        this.id = 0;
    }

    createFile(){
        fs.writeFileSync(this.nombreArchivo, '');
    }

    checkIfFileExists(){
        if (!fs.existsSync(this.nombreArchivo)) {
            this.createFile();
        }
    }

    getLastId(){
        let array = this.getCarritos();
        if (array.length === 0) {
            return 0;
        }
        let lastId = array[array.length - 1].id;
        return lastId;
    }
    
    getCarritoById = (id) => {

        let array = this.getCarritos();
        let objeto = array.find(objeto => objeto.id === id);
        return JSON.parse(objeto);

    }
    
    getCarritos() {
        let array = fs.readFileSync(this.nombreArchivo, 'utf-8');
        if (array.length === 0) {
            return [];
        } else {
            return JSON.parse(array);
        }
    }

    getProductosCarrito = (id) => {
        const carrito = obtenerCarrito(id);
        if(carrito === undefined) {
            return JSON.parse({error: 'carrito no encontrado'});
        } else {
            return JSON.parse(carrito.productos);
        }
    }

    postProductoCarrito = (idCarrito, idProducto) => {
        const carrito = obtenerCarrito(idCarrito);
        const producto = obtenerProducto(idProducto);
        if(carrito === undefined || producto === undefined) {
            return JSON.parse({error: 'carrito o producto no encontrado'});
        } else {
            carrito.productos.push(producto);
            return JSON.parse(true);
        }
    }

    postCarrito() {
        const newCarrito = {
            id: this.getLastId() + 1,
            timestamp: Date.now(),
            productos: []
        }
        let array = this.getCarritos();
        array.push(newCarrito);
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(array, null, 2));
        return JSON.parse(newCarrito.id);
    }

    deleteProductoCarrito = (idCarrito, idProducto) => {
        const carrito = obtenerCarrito(idCarrito);
        if(carrito === undefined) {
            return JSON.parse({error: 'carrito no encontrado'});
        } else {
            const producto = obtenerProducto(idProducto);
            if(producto === undefined) {
                return JSON.parse({error: 'producto no encontrado'});
            } else {
                const index = carrito.productos.indexOf(producto);
                carrito.productos.splice(index, 1);
                return JSON.parse(true);
            }
        }
    }

    deleteCarrito = (id) => {
        const carrito = obtenerCarrito(id);
        if(carrito === undefined) {
            return JSON.parse({error: 'carrito no encontrado'});
        } else {
            const index = database.indexOf(carrito);
            database.splice(index, 1);
            return JSON.parse(true);
        }
    }
    
    deleteAll() {
        fs.writeFileSync(this.nombreArchivo, '');
    }
}


module.exports = Carrito;
