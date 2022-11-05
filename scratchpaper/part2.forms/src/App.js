import Note from './components/Note';
import {useState} from 'react';

const App = (props) => {

  const [notes,setNotes] = useState(props.notes);
  const [newNote,setNewNote] = useState('this is my new note.');
  const [showAll,setShowAll] = useState(true);

  // creates global obj var for notes. debug purposes
  window.notes = notes;

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const addNote = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target);
    const newObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < .5
    }
    console.log(newObject)
    const newNotesObj = notes.concat(newObject);
    setNotes(newNotesObj);
    setNewNote('');
  }

  const handleNoteChange = (event) => {
    console.log('setting new note value, ',event.target.value);
    setNewNote(event.target.value);
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>Show {showAll ? 'Important' : 'All'}</button>
      <ul>
        {notesToShow.map((notes) => <Note content={notes.content} key={notes.id}/> )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit" >save</button>
      </form>
    </div>
  )
}

export default App