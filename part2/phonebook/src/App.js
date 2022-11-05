import { useState } from 'react';

const App = () => {

  const [names, setNames] = useState([]);
  const [newName, setNewName] = useState('Enter new name here');

  window.names = names;

  // ---------------- NAME CHANGES ----------------
  // whenever a change in the name form is detected
  // set the new name up to be added to list 'numbers'
  const handleNameFormChange = (event) => {
    setNewName(event.target.value);
    console.log('logging new name:', event.target.value);
  }

  const handleNameSubmission = (event) => {
    event.preventDefault();
    if (names.includes(newName)) {
      alert(`${newName} is already present in phonebook.`);
      return;
    }
    console.log('adding name to list: ', newName)
    setNames(names.concat(newName));
  }

  // ---------------- NUMBER CHANGES ----------------
  const handleNumberFormChange = (event) => {
  }

  const handleNumberSubmission = (event) => {
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={handleNameSubmission}>
        <div>
          Name: <input value={newName} onChange={handleNameFormChange} />
        </div>
        <button type="submit">add</button>
      </form>
      <h1>Numbers</h1>
      {names.map(name => <div key={name}>{name}</div>)}
    </div>
  );
}

export default App;
