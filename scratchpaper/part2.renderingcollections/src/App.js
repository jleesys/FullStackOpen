const App = (props) => {
  const { notes } = props
  window.notes = notes;

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((notes) => <li key={notes.id}>{notes.content}</li>)}
      </ul>
    </div>
  )
}

export default App