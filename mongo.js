const mongoose = require("mongoose");
//const password = require("./password.js");
//const { Schema, model } = mongoose;

mongoose.set('strictQuery', false)

const connectionString = process.env.MONGO_DB_URI

console.log('connecting to', connectionString)
// conexion a mongodb

mongoose.connect(connectionString)
    /*     useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true */
  
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log('error connecting to mongodb:', error.message);
  });
