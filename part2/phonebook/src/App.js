import { useState } from 'react';

const App = () => {

  const [persons, setPersons] = useState([
    {
      name: 'Anna Sass',
      phoneNumber: '949-193-1993',
      id: 1
    },
    {
      name: 'Ronald Roger',
      phoneNumber: '724-333-9924',
      id: 2
    }
  ]);
  // State vars for NAME entry
  const [newName, setNewName] = useState('Enter new name here');
  // State vars for NUMBER entry
  const [newNumber, setNewNumber] = useState('Enter new number here');
  // state vars for search term
  const [searchTerm, setSearchTerm] = useState('Name to search');

  window.persons = persons;

  // ---------------- SEARCH TERM CHANGES ----------------
  const handleSearchFormChange = (event) => {
    setSearchTerm(event.target.value);
  }
  const handleSearch = (event) => {
    event.preventDefault();
    const sanitSearchTerm = searchTerm.toLowerCase();
    console.log('searching persons...',sanitSearchTerm);
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.toLowerCase() === sanitSearchTerm) {
        console.log(`${searchTerm} found`);
      }
    }
  }

  // ---------------- NAME CHANGES ----------------
  // whenever a change in the name form is detected
  // set the new name up to be added to list 'numbers'
  const handleNameFormChange = (event) => {
    setNewName(event.target.value);
    console.log('logging new name:', event.target.value);
  }

  // ---------------- NUMBER CHANGES ----------------
  const handleNumberFormChange = (event) => {
    setNewNumber(event.target.value);
  }

  // FUNCTION TO HANDLE SUBMISSION OF NUMBERS AND NAMES
  const handleSubmission = (event) => {
    event.preventDefault();
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName)
      alert(`${newName} is already present in phonebook.`);
    }
    const newPersonToAdd = {
      name: newName,
      phoneNumber: newNumber,
      id: persons.length + 1
    }
    console.log('adding person to list: ', newPersonToAdd)
    setPersons(persons.concat(newPersonToAdd));
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={handleSearch}>
        <div>
          filter shown with <input value={searchTerm} onChange={handleSearchFormChange}></input>
        </div>
        <button type="submit">Search</button>
      </form>
      <h1>Add new entry</h1>
      <form onSubmit={handleSubmission}>
        <div>
          Name: <input value={newName} onChange={handleNameFormChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberFormChange} />
        </div>
        <button type="submit">add</button>
      </form>
      <h1>Numbers</h1>
      {persons.map(person => <div key={person.id}>{person.name} {person.phoneNumber}</div>)}
    </div>
  );
}

export default App;
