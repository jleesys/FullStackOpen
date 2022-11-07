import { useState } from 'react';

function App() {

  const [searchTerm, setSearchTerm] = useState('Name to Search');
  const [showAll, setShowAll] = useState(true);
  const [numberSubmission, setNumberSubmission] = useState('Name to Enter');
  const [nameSubmission, setNameSubmission] = useState('Number to Enter');

  window.showAll = showAll;
  window.searchTerm = searchTerm;
  window.numberSubmission = numberSubmission;
  window.nameSubmission = nameSubmission;
  /* ---------- PERSON STRUCTURE ----------
    name: firstname + lastname
    phoneNumber: phone number in whatever form, dashes or otherwise
    id: id incrementing by 1 for each number added
  */

  // create person state and intial values (for testing purposes)
  const [persons, setPersons] = useState([
    {
      name: 'Lenny Johnson',
      phoneNumber: '949-496-1839',
      id: 1
    },
    {
      name: 'Rob Larson',
      phoneNumber: '724-888-8391',
      id: 2
    },
    {
      name: 'Steven Ron',
      phoneNumber: '921-224-5595',
      id: 3
    }
  ]);
  const findPerson = (person, searchTerm) => {
     if (person.name.toLowerCase().includes(searchTerm.toLowerCase())) return true;
    }
  const personsToShow = showAll ? persons : persons.filter(person => findPerson(person, searchTerm)); 
  window.personsToShow = personsToShow;
  window.persons = persons;


  const handleSearchFieldChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    console.log(`searchTerm is updated to`, searchTerm);
  }
  // ***********************************************
  // button is hit, searchTerm taken to parse through list of persons
  const handleSearchSubmission = (event) => {
    event.preventDefault();
    // setShowAll(!showAll);
    setShowAll(false);
  }

  const handleNumberFieldChange = (event) => {
    setNumberSubmission(event.target.value);
    console.log(`number to enter updated to ${numberSubmission}`);
  }
  const handleNameFieldChange = (event) => {
    setNameSubmission(event.target.value);
    console.log(`name to enter updated to ${nameSubmission}`);
  }

  const checkPersons = () => {
    for (let i = 0 ; i < persons.length; i++) {
      if (persons[i].name.toLowerCase() === nameSubmission.toLowerCase()) return true; 
    }
  }

  const handleEntry = (event) => {
    event.preventDefault();
    if (checkPersons()) {
      alert(`${nameSubmission} already exists in phonebook. Try again.`);
      console.log(`${nameSubmission} already exists in phonebook. Try again.`);
    } else {
    const newEntry = {
      name: nameSubmission,
      phoneNumber: numberSubmission,
      id: persons.length + 1
    }
    setPersons(persons.concat(newEntry));
  }
  }


  return (
    <div>
      <h1>Your Phonebook</h1>
      <h3>Search By Name</h3>
      {/* Search form  */}
      <form >
        <input placeholder="Name Here" onChange={handleSearchFieldChange}></input>
        <button type="submit" onClick={handleSearchSubmission}>Search</button>
      </form>
      <h3>Enter New Number</h3>
      {/* Entry form */}
      {/* onSubmit */}
      <form onSubmit={handleEntry}>
        <div>
          Number <input placeholder={'Number Here'} onChange={handleNumberFieldChange}></input><br></br>
          Name <input placeholder={'Name Here'} onChange={handleNameFieldChange}></input>
        </div>
        <button type="submit">Add</button>
      </form>
      <h3>Phonebook</h3>
      <button onClick={() => setShowAll(true)}>Show All</button>
      {/* List of current entries */}
      {personsToShow.map(person => <div key={person.id}>{person.name} {person.phoneNumber}</div>)}
    </div>
  );
}

export default App;
