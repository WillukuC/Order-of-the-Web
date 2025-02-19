const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.MONGODB_URI) 
        console.log('Mongo connected successfully.')
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectToMongo;