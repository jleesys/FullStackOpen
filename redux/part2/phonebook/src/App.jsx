import { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from '../src/services/persons';

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

const Person = ({ person, handleDeletion }) => {
  return (
    <div>
      {person.name} {person.number} <button onClick={(e) => {
        e.preventDefault();
        handleDeletion(person);
      }} >Delete</button>
    </div>
  )
}

      //{filteredPersons.map((person) => <Person key={person.id} id={person.id}
      //  name={person.name} number={person.number} handleDeletion={handleDeletion} />)}
const DisplayPanel = ({ persons, searchTerm, handleDeletion }) => {
  const filteredPersons = persons.filter((person) => person.name.includes(searchTerm));
  return (
    <>
      {filteredPersons.map((person) => <Person key={person.id} person={person} 
      handleDeletion={handleDeletion} />)}
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
        setPersons(response.data);
      })
  }, []
  )

  const handleDeletion = (personToDelete) => {
    if (!window.confirm(`Remove ${personToDelete.name}?`)) {
      return;
    }
    personsService
      .remove(personToDelete)
      .then(response => {
        setPersons(persons.filter((person) => person.id !== personToDelete.id));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleSubmission = (e) => {
    e.preventDefault();
    let newSubmission = {};
    const names = persons.map(person => person.name);
    if (names.filter((name) => newName == name).length != 0) {
      console.log('user update ', newSubmission)
      alert(`Person ${newName} already exists. Replace number with new one?`);
      const matchedPerson = persons.filter((person) => person.name == newName);
      newSubmission = matchedPerson[0];
      newSubmission.number = newNumber;
      console.log('updating ', newSubmission)
      personsService
        .update(newSubmission)
        .then(response => {
          setPersons(persons.concat(response));
          setNewName('');
          setNewNumber('');
        })
    } else {
      console.log('new user creation')
      newSubmission = {
        name: newName,
        number: newNumber
//        id: persons.length + 1
      }
      console.log('creating ', newSubmission)
      personsService
        .create(newSubmission)
        .then(response => {
          setPersons(persons.concat(response));
          setNewName('');
          setNewNumber('');
        })
    }
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
