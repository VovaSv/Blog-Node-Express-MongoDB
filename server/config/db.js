const mongoose = require('mongoose');
const dbURI = `mongodb+srv://vovasvidi:${process.env.dbPass}@cluster69.0nfk51j.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;
const connectDB = async (uri) => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri || dbURI);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
