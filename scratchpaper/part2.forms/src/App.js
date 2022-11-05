import Note from './components/Note';
import {useState} from 'react';

const App = (props) => {

  const [notes,setNotes] = useState(props.notes);

  const addNote = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target);
  }
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((notes) => <Note content={notes.content} key={notes.id}/> )}
      </ul>
      <form onSubmit={addNote}>
        <input/>
        <button type="submit" >save</button>
      </form>
    </div>
  )
}

export default App