const mongoose = require("mongoose");

const dbURI = "mongodb+srv://admin:1234@cluster0-vf9xd.mongodb.net/Cluster0?retryWrites=true&w=majority";


const options = {
  // reconnectTries: Number.MAX_VALUE,
  // poolSize: 10,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connects the database to the server
mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

require("../models/Product");
