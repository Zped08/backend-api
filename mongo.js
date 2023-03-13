const mongoose = require("mongoose");
//const password = require("./password.js");
//const { Schema, model } = mongoose;

const connectionString = process.env.MONGO_DB_URI

// conexion a mongodb

mongoose.connect(connectionString, {
    /*     useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true */
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.error(err);
  });


