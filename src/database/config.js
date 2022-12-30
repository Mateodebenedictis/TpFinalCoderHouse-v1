const mongoose = require('mongoose');

const mongoDbConnection = async () => {

    mongoose.set('strictQuery', true);

    try {
        await mongoose.connect('mongodb+srv://final-coderhouse:coderhouse@coderhouse.zwimx1t.mongodb.net/coderhouse?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

    } catch (error) {
        console.log(error);
    }
};

module.exports = {mongoDbConnection};