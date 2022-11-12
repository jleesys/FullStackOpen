import { useEffect, useState } from 'react';
import axios from 'axios';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import numberServices from './services/numbers';

const App = () => {

  const [persons, setPersons] = useState([]);
  // dummy data for ease of testing
  /*
  {
    name: 'Anna Sass',
    number: '949-193-1993',
    id: 1
  },
  {
    name: 'Ronald Roger',
    number: '724-333-9924',
    id: 2
  }
  */
  // State vars for NAME entry
  const [newName, setNewName] = useState('');
  // State vars for NUMBER entry
  const [newNumber, setNewNumber] = useState('');
  // state vars for search term
  const [searchTerm, setSearchTerm] = useState('Name to search');
  //state vars for search filter
  const [showAll, setShowAll] = useState(true);

  const personsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()));

  window.persons = persons;
  window.personsToShow = personsToShow;

  // SETTING UP EFFECT
  useEffect(() => {
    console.log('Promise made, effect soon to follow');

    // console.log(numberServices.getAll());
    numberServices.getAll().then(response => setPersons(response));
    /*
    axios.get('http://localhost:3001/persons')
      .then(response => {
        console.log('Promise fulfilled.', response.data);
        setPersons(response.data);
      })
      */
  }, [])


  // ---------------- SEARCH TERM CHANGES ----------------
  const handleSearchFormChange = (event) => {
    setSearchTerm(event.target.value);
  }
  const handleSearch = (event) => {
    event.preventDefault();
    const sanitSearchTerm = searchTerm.toLowerCase();
    console.log('searching persons...', sanitSearchTerm);
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.toLowerCase().includes(sanitSearchTerm)) {
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

    console.log('HANDLING SUBMISSION')

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        console.log('found dUPE')
        alert(`${newName} is already present in phonebook.`);
        return;
      }
    }
    const newPersonToAdd = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    console.log('adding person to list: ', newPersonToAdd)

    // EFFECT FOR PUSHING NEW PERSON
    setNewNumber('');
    setNewName('');

    numberServices.create(newPersonToAdd)
      .then(response => setPersons(persons.concat(response)));

    /*
    axios.post('http://localhost:3001/persons', newPersonToAdd)
      .then(response => {
        console.log('setting persons', response);
        setPersons(persons.concat(response.data))
      })
      */
  }

  const removePerson = (personID) => {
    numberServices.remove(personID);
    setPersons(persons.filter(person => person.id !== personID));
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleSearch={handleSearch} searchTerm={searchTerm}
        handleSearchFormChange={handleSearchFormChange}
        setShowAll={setShowAll} showAll={showAll} />
      <h1>Add new entry</h1>
      <PersonForm handleSubmission={handleSubmission}
        newName={newName} handleNameFormChange={handleNameFormChange}
        newNumber={newNumber}
        handleNumberFormChange={handleNumberFormChange} />
      <h1>Numbers</h1>
      <Persons personsToShow={personsToShow} removePerson={removePerson}/>
    </div>
  );
}

export default App;
