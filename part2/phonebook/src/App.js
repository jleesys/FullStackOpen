import { useState } from 'react';

const App = () => {

  const [persons, setPersons] = useState([]);
  // State vars for NAME entry
  const [names, setNames] = useState([]);
  const [newName, setNewName] = useState('Enter new name here');
  // State vars for NUMBER entry
  const [numbers, setNumbers] = useState([]);
  const [newNumber, setNewNumber] = useState('Enter new number here');

  window.names = names;
  window.numbers = numbers;
  window.persons = persons;

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
    const newPersonToAdd = {
      name: newName,
      phoneNumber: newNumber
    }
    console.log('adding person to list: ', newPersonToAdd)
    setPersons(persons.concat(newPersonToAdd));
    /*
    if (names.includes(newName)) {
      alert(`${newName} is already present in phonebook.`);
      return;
    }
    console.log('adding name to list: ', newName)
    setNames(names.concat(newName));
    setNumbers(numbers.concat(newNumber));
    */
  }

  return (
    <div>
      <h1>Phonebook</h1>
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
      {persons.map(person => <div key={person.name}>{person.name} {person.phoneNumber}</div>)}
    </div>
  );
}

export default App;
