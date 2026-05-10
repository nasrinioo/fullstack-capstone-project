const { MongoClient } = require('mongodb');

let client;
let database;

/**
 * Connects to MongoDB using the native driver.
 * Assignment requirement: await client.connect()
 */
async function connectToDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
  const dbName = process.env.MONGODB_DB || 'giftlink';

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    database = client.db(dbName);
  }

  return database;
}

async function closeDatabase() {
  if (client) {
    await client.close();
    client = undefined;
    database = undefined;
  }
}

module.exports = { connectToDatabase, closeDatabase, getClient: () => client };
