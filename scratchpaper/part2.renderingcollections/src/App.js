const Note = (props) => {
  const {content} = props;
  return (
    <li>{content}</li>
  )
}

const App = ({notes}) => {
  // const { notes } = props
  // window.notes = notes;

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((notes) => <Note content={notes.content} key={notes.id}/> )}
      </ul>
    </div>
  )
}

export default App