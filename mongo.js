/* const mongoose = require("mongoose");
//const password = require("./password.js");
//const { Schema, model } = mongoose;

mongoose.set('strictQuery', false)

const connectionString = process.env.MONGO_DB_URI

console.log('connecting to', connectionString)
// conexion a mongodb

mongoose.connect(connectionString)
    /    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true 
  
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log('error connecting to mongodb:', error.message);
  }); */

  const mongoose = require('mongoose')

  if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }
  
  const password = process.argv[2]
  
  const connectionString = process.env.MONGO_DB_URI
  
  mongoose.set('strictQuery',false)
  mongoose.connect(url)
  
  const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
  })
  
  const Note = mongoose.model('Note', noteSchema)
  
  const note = new Note({
    content: 'Mongoose makes things easy',
    date: new Date(),
    important: true,
  })
  
  /*
  note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
  */
  
  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })