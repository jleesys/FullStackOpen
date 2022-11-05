import { useState } from 'react';

const App = () => {

  const [numbers, setNumbers] = useState([]);
  const [newName, setNewName] = useState('Enter new name here');

  // whenever a change in the name form is detected
  // set the new name up to be added to list 'numbers'
  const handleFormChange = (event) => {
    setNewName(event.target.value);
    console.log('logging new name:', event.target.value);
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form /* onSubmit */>
        <div>
          Name: <input value={newName} onChange={handleFormChange}/>
        </div>
        <button>add</button>
      </form>
      <h1>Numbers</h1>
    </div>
  );
}

export default App;
