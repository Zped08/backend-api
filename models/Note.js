/* const mongoose = require('mongoose')
const { Schema, model } = require("mongoose");



const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

noteSchema.set('toJSON', {
    transform:(document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id,
        delete returnedObject.__v
    }
})

// const Note = mongoose.model("Note", noteSchema);

/* Note.find({}).then(result =>{
    console.log(result)
    mongoose.connection.close()
}) */

/* const note = new Note({
  content: "Mongodb is amazing",
  date: new Date(),
  important: true,
}); 

note
  .save()
  .then((result) => {
    console.log(result);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
  });
 */

// module.exports = mongoose.model('Note' noteSchema);


const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const connectionString = process.env.MONGO_DB_URI

console.log('connecting to', connectionString)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)