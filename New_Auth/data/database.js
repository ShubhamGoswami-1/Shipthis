const mongodb = require('mongodb');
const fs = require("fs");

const MongoClient = mongodb.MongoClient;

let database;
let client;

async function connectToDatabase() {
  client = await MongoClient.connect(
    'mongodb://127.0.0.1:27017'
  );
  database = client.db('showstv');
}

function getDb() {
  if (!database) {
    throw { message: 'You must connect first!' };
  }
  return database;
}


module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb
};
