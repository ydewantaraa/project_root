const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');
const db = client.db('project_db');

const productCollection = db.collection('products');

module.exports = productCollection;
