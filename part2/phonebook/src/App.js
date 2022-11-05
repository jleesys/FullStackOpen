import {useState} from 'react';

const App = () => {

  const [numbers, setNumbers] = useState([]);

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <div>
        Name: <input />
        </div>
        <div>
          <button>add</button>
        </div>
      </form>
      <h1>Numbers</h1>
    </div>
  );
}

export default App;
