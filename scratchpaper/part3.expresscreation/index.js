const repl = require('repl');

const express = require('express')
const app = express()
app.use(express.json());

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2022-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2022-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2022-05-30T19:20:14.298Z",
        important: true
    }
]

app.get('/', (request, response) => {
    response.send('<h1>EXPRESS!</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find(note => note.id === id);
    if (note) {
        response.json(note)
    } else {
        console.log('note not found')
        response.status(404).end();
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    console.log(`searching for id ${id} to delete`);
    notes = notes.filter(note => note.id !== id);

    response.status(204).end();
})

const generateID = () => {
    const max = notes.length > 0 ? Math
        .max(...notes.map(note => note.id)) : 0;
    return max + 1 ;

}

// add note
app.post('/api/notes', (request, response) => {
    // console.log(noteToAdd, request.get('Content-Type'));

    if (!request.body.content) {
        response.status(400).end().json({error: "content missing"});
    }

    const noteToAdd = {
       id: generateID(),
       content: request.body.content,
       date: new Date(),
       important: request.body.important  || false
    }

    notes = notes.concat(noteToAdd);

    response.json(noteToAdd);
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})