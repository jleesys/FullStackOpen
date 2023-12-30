import { useState } from 'react'

const EntryForm = ({setName, setNumber, handleSubmission}) => {
  const handleNameEntry = (e) => {
    e.preventDefault();
    setName(e.target.value);
  }
  const handleNumberEntry = (e) => {
    e.preventDefault();
    setNumber(e.target.value);
  }
  return (
      <form onSubmit={handleSubmission}>
        <div>
          name: <input onChange={handleNameEntry} />
          number: <input onChange={handleNumberEntry} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const DisplayPanel = ({persons}) => {
  return (
      <>
      {persons.map((person) => <div key={person.name}>{person.name} {person.number}</div>)}
      </>
  )
}

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '9494869619' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleSubmission = (e) => {
    e.preventDefault();
    const names = persons.map(person => person.name);
    if (names.filter((name) => newName == name).length !=0) {
      console.log("person already exists");
      alert(`Person ${newName} already exists. Please try again with a new person.`);
      return;
    }

    const newSubmission = {
      name: newName,
      number: newNumber
    }
    console.log('new person ', newSubmission)
    setPersons(persons.concat(newSubmission));
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <EntryForm setName={setNewName} setNumber={setNewNumber} handleSubmission={handleSubmission} />
      <h2>Numbers</h2>
      <DisplayPanel persons={persons} />
    </div>
  )
}

export default App
