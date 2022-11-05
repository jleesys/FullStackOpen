import Note from './components/Note';

const App = ({notes}) => {

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((notes) => <Note content={notes.content} key={notes.id}/> )}
      </ul>
      <form>
        <input>
        </input>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App