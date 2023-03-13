require('dotenv').config()
require('./mongo')

const express = require("express");
const app = express();
const cors = require("cors");

const Note = require('./models/Note')

app.use(cors());
app.use(express.json());

app.use((request, response, next) => {
  console.log(request.method);
  console.log(request.path);
  console.log(request.body);
  console.log("--------------");
  next();
});

let notes = []

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

 app.get("/api/notes", (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes);
  })
}); 

/* const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
}; */

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({
      error: "content missing",
    });
  }


  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
//    id: generateId(),
  });

  note
  .save()
  .then(savedNote => savedNote.toJSON())
  .then(savedAndFormattedNote => {
    response.json(savedAndFormattedNote)
  }) 

/*   .save()
  .then(savedNote => {
    response.json(savedNote)
  })
  .catch(error => next(error))  */

/*   notes = notes.concat(note);

  response.json(note); */
});

app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id).then(note => {
  if (note) { 
    response.json(note)
  } else {
    response.status(404).end()
  }
  })
  .catch(err => next (err))
 /*    console.log(err)
    response.status(400).send({err: 'malformatted id'}) */
  })
/*   const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }

  response.json(note); */

  app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body
  
    const note = {
      content: body.content,
      important: body.important,
    }
  
    Note.findByIdAndUpdate(request.params.id, note, { new: true })
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
  })

app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
/*   const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end(); */
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }


  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
