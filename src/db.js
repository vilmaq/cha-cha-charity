const mongoose = require("mongoose");

const { DB_URL, MONGOOSE_OPTIONS } = require("./config/connection");

const connect = async () => {
  try {
    await mongoose.connect(DB_URL, MONGOOSE_OPTIONS);
    console.log("Successfully connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

const disconnect = async () => {
  try {
    await mongoose.connection.close();
    console.log("Successfully disconnected from mongoDB");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  connect,
  disconnect,
};
