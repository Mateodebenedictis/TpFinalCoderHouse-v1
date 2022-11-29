const fs=require('fs');


class Producto {
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
        let array = this.getProductos();
        if (array.length === 0) {
            return 0;
        }
        let lastId = array[array.length - 1].id;
        return lastId;
    }
    
    getProductoById(id) {

        let array = this.getProductos();
        let objeto = array.find(objeto => objeto.id === id);
        return JSON.parse(objeto);

    }
    
    getProductos() {
        let array = fs.readFileSync(this.nombreArchivo, 'utf-8');
        if (array.length === 0) {
            return [];
        } else {
            return JSON.parse(array);
        }
    }

    save(objeto) {
        let array = this.getProductos();
        this.id = this.getLastId() + 1;
        objeto.id = this.id;
        objeto.timestamp = Date.now();
        array.push(objeto);
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(array, null, 2));
        return JSON.parse(objeto);
    }


    updateById(id, objeto) {

        let array = this.getProductos();

        try {

            let objetoActualizado = array.find(objeto => objeto.id === id);

            if (objetoActualizado === undefined) {

                return JSON.parse({error: 'Producto no encontrado'});

            } else {

                let indice = array.indexOf(objetoActualizado);
                objeto.id = id;
                objeto.timestamp = Date.now();
                array[indice] = objeto;
                fs.writeFileSync(this.nombreArchivo, JSON.stringify(array, null, 2));
                return JSON.parse(objeto);

            }
        }
        catch (error) {
            console.log(error);
            console.log('No se pudo actualizar el objeto con ese ID');
            return JSON.parse({error: 'No se pudo actualizar el objeto con ese ID'});
        }
    }

    deleteById(id) {
        let array = this.getProductos();
        let objeto = array.find(objeto => objeto.id === id);

        if (objeto === undefined) {
            return JSON.parse({error: 'No se pudo borrar el objeto con ese ID'});
        } else {

            let indice = array.indexOf(objeto);
            array.splice(indice, 1);
            fs.writeFileSync(this.nombreArchivo, JSON.stringify(array, null, 2));
            return JSON.parse(objeto);
        }
    }
    
    deleteAll() {
        fs.writeFileSync(this.nombreArchivo, '');
    }
}


module.exports = Producto;
