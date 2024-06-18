const express = require('express');
const app = express();
const port = 3000;

// Import router untuk endpoint v1 dan v2
const productRouterV1 = require('./api/v1/routes');
const productRouterV2 = require('./api/v2/routes');

// Hubungkan ke MongoDB dengan Mongoose
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/project_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB using Mongoose');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

connectDB();

// Gunakan router untuk endpoint v1 dan v2
app.use('/api/v1', productRouterV1);
app.use('/api/v2', productRouterV2);

// Jalankan server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
