const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://final-coderhouse:coderhouse@coderhouse.zwimx1t.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('MongoDB Connected');
    }
});


class MongoContainer {

    constructor() {
        this.db = mongoose.connection;
    }

    async get(collection, id) {
        if (!id) {
            const query = await this.db.collection(collection).get();
            const docs = query.docs;
            const response = docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return response;
        }
        const doc = await this.db.collection(collection).doc(id).get();
        const response = { id: doc.id, ...doc.data() };
        return response;
    }

    async add(collection, data, id) {

        if (!id) {

            const doc = await this.db.collection(collection).add(data);
            const response = { id: doc.id, ...data };
            return response;

        }

        await this.db.collection(collection).doc(id).set(data);
        const response = { id, ...data };
        return response;

    }

    async update(collection, id, data) {
        await this.db.collection(collection).doc(id).update(data);
        const response = { id, ...data };
        return response;
    }

    async delete(collection, id, idProduct) {

        if (idProduct) {
            const doc = await this.db.collection(collection).doc(id).get();
            const data = doc.data();
            const productos = data.productos.filter(producto => producto.id !== idProduct);
            await this.db.collection(collection).doc(id).update({ productos });
            return { id };
        }

        await this.db.collection(collection).doc(id).delete();
        return { id };
    }

}

module.exports = MongoContainer;