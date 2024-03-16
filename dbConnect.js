
// Calling the mongodb Driver
const { MongoClient } = require('mongodb');
// const { connect } = require('mongoose');

let dbConnection;

function connectDatabase(cb) {
    MongoClient.connect('mongodb://localhost:6969/movieRental')
        .then((client) => {
            dbConnection = client.db();
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