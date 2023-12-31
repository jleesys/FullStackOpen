import { useState, useEffect } from 'react'
import axios from 'axios'

const EntryForm = ({ newName, newNumber, setName, setNumber, handleSubmission }) => {
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
          name: <input value={newName} onChange={handleNameEntry} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberEntry} />
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

const Person = ({ name, number }) => {
  return (
    <div>
      {name} {number} <button>Delete</button>
    </div>
  )
}

//{filteredPersons.map((person) => <div key={person.name}>{person.name} {person.number}</div>)}
const DisplayPanel = ({ persons, searchTerm, setPersons, handleDeletion }) => {
  const filteredPersons = persons.filter((person) => person.name.includes(searchTerm));
  return (
    <>
      {filteredPersons.map((person) => <Person key={person.id} name={person.name} number={person.number} />)}
    </>
  )
}

function App() {
  const [persons, setPersons] = useState([]);
  //    { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  //  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('response received ', response.data);
        setPersons(response.data);
      })
  }, []
  )

  const handleDeletion = (e) => {
    e.preventDefault();
    console.log('Delete request to server');

  }

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
      number: newNumber,
      id: persons.length + 1
    }

    axios
      .post('http://localhost:3001/persons', newSubmission)
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err);
        return;
      });
    setPersons(persons.concat(newSubmission));
    setNewName('');
    setNewNumber('');
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearchChange={handleSearchChange} />
      <EntryForm newNumber={newNumber} newName={newName} setName={setNewName}
        setNumber={setNewNumber} handleSubmission={handleSubmission} />
      <h2>Numbers</h2>
      <DisplayPanel persons={persons} searchTerm={searchTerm}
        setPersons={setPersons} handleDeletion={handleDeletion} />
    </div>
  )
}

export default App
