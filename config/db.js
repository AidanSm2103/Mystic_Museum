const mongoose = require('mongoose');

// Centralising the connection here keeps server.js focused on wiring
// up the app, and means anything else that needs a DB connection
// (like seed.js) can reuse the same logic.
async function connectDB() {
  if (!process.env.MONGODB_URI) {
    console.error('Missing MONGODB_URI in your .env file.');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected.');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
