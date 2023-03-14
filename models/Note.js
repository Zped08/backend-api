const mongoose = require('mongoose')
const { Schema, model } = require("mongoose");



const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

noteSchema.set('toJSON', {
    transform:(document, returnedObject) => {
        returnedObject.id = returnedObject._id,
        delete returnedObject._id,
        delete returnedObject.__v
    }
})

const Note = mongoose.model("Note", noteSchema);

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

module.exports = Note;
