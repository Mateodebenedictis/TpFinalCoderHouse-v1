const admin = require('firebase-admin');

const serviceAccount = require('../db/proyectofinalv2-coderhouse-firebase-adminsdk-5i533-a554e78906.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://proyectofinalv2-coderhouse.firebaseio.com"
});


class FirebaseContainer {

    constructor() {
        this.db = admin.firestore();
    }

    async get(collection, id) {

        //Si no se pasa id, se devuelve todo el contenido de la colección
        if (!id) {

            const query = await this.db.collection(collection).get();
            const docs = query.docs;
            const response = docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return response;

        }

        //Si se pasa un array de ids, se devuelve un array de objetos con los datos de cada documento
        if (Array.isArray(id)) {

            const query = await this.db.collection(collection).where(admin.firestore.FieldPath.documentId(), 'in', id).get();
            const docs = query.docs;
            const response = docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return response;

        }

        //Si se pasa un id, se devuelve un objeto con los datos del documento
        const doc = await this.db.collection(collection).doc(id).get();
        const response = { ...doc.data() };
        return response;
    }

    async add(collection, data, id) {

        //Si no se pasa id, se crea un nuevo documento con los datos pasados sabiendo que se trata del insert de un producto o de un carrito
        if (!id) {
            
            const doc = await this.db.collection(collection).add(data);
            const response = { id: doc.id, ...data };
            return response;

        }

        //Si se pasa un id, se crea un nuevo documento con los datos pasados sabiendo que se trata del insert de un producto en un carrito

        const doc = await this.db.collection(collection).doc(id).get();
        const dataCarrito = doc.data();

        //Si el carrito está vacío, se crea un array de productos y se inserta el producto
        if(Object.keys(dataCarrito).length === 0) {

            const productos = [];
            productos.push(data);
            await this.db.collection(collection).doc(id).set({ productos });
            const response = { id, ...data };
            return response;

        }

        //Si el carrito no está vacío, se inserta el producto en el array de productos
        const productos = dataCarrito.productos;

        if (productos) {
            productos.push(data);
        }

        await this.db.collection(collection).doc(id).update({ productos });
        const response = { id, ...data };
        return response;

    }

    

    async update(collection, id, data) {
        await this.db.collection(collection).doc(id).update(data);
        const response = { id, ...data };
        return response;
    }

    async delete(collection, id, idProduct) {

        //Si se pasa un id de producto, se elimina el producto del carrito
        if (idProduct) {
            const doc = await this.db.collection(collection).doc(id).get();
            const data = doc.data();
            const productos = data.productos.filter(producto => producto !== idProduct);
            await this.db.collection(collection).doc(id).update({ productos });
            return { id };
        }

        await this.db.collection(collection).doc(id).delete();
        return { id };
    }

}

module.exports = FirebaseContainer;





