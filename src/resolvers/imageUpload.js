const { Event } = require("../models");

const imageUpload = async (_, { input }) => {
  console.log("file", input);
  // await file;
};

module.exports = imageUpload;
