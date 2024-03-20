
// Calling the mongodb Driver
const { MongoClient } = require('mongodb');
// const { connect } = require('mongoose');

let dbConnection;    
let password = 'dSKbqC9goiYzpgap'

function connectDatabase(cb) {
    MongoClient.connect(`mongodb+srv://sumi:${password}@moviesystem.2em7psp.mongodb.net/?retryWrites=true&w=majority&appName=movieSystem`)
        .then((client) => {
            dbConnection = client.db('movieRental');
            cb(null)
        })
        .catch(err => {
            console.error(err);
            cb(err);
        });
}

function getDB() {
    return dbConnection
}

module.exports = {
    connectDatabase: connectDatabase,
    getDB: getDB
}