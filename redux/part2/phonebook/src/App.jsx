import { useState } from 'react'

const EntryForm = ({ setName, setNumber, handleSubmission }) => {
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
      <h2>Add new number</h2>
      <div>
        <div>
          name: <input onChange={handleNameEntry} />
        </div>
        <div>
          number: <input onChange={handleNumberEntry} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

function Search({ handleSearchChange }) {
  return (
    <div>
      <h2>Search</h2>
      Enter name: <input onChange={handleSearchChange} />
    </div>
  )
}

const DisplayPanel = ({ persons, searchTerm }) => {
  const filteredPersons = persons.filter((person) => person.name.includes(searchTerm));
  console.log(filteredPersons)
  return (
    <>
      {filteredPersons.map((person) => <div key={person.name}>{person.name} {person.number}</div>)}
    </>
  )
}

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '9494869619' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmission = (e) => {
    e.preventDefault();
    const names = persons.map(person => person.name);
    if (names.filter((name) => newName == name).length != 0) {
      console.log("person already exists");
      alert(`Person ${newName} already exists. Please try again with a new person.`);
      return;
    }

    const newSubmission = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newSubmission));
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearchChange={handleSearchChange} />
      <EntryForm setName={setNewName} setNumber={setNewNumber} handleSubmission={handleSubmission} />
      <h2>Numbers</h2>
      <DisplayPanel persons={persons} searchTerm={searchTerm} />
    </div>
  )
}

export default App
