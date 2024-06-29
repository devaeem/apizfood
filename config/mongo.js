

const mongoose = require("mongoose");
require('dotenv').config()
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MOMGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
const closeDatabaseConnection = () => {
  mongoose.connection.close();
};

module.exports = connectToDatabase