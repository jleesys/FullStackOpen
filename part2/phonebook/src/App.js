import { useEffect, useState } from 'react';
import axios from 'axios';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';
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
  // state vars for error message when applicable
  const [message, setMessage] = useState(null);
  window.message = message;

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
    // console.log('logging new name:', event.target.value);
  }

  // ---------------- NUMBER CHANGES ----------------
  const handleNumberFormChange = (event) => {
    setNewNumber(event.target.value);
  }

  // FUNCTION TO HANDLE SUBMISSION OF NUMBERS AND NAMES
  const handleSubmission = (event) => {
    event.preventDefault();

    const foundPerson = persons.find(person => person.name === newName);
    if (foundPerson) {
      if (window.confirm(`${newName} is already present in the phonebook. \nWould you like to update with a new phone number?`)) {
        console.log('proceeding to make updated person record')
        const updatedPerson = {
          ...foundPerson,
          number: newNumber
        }
        numberServices.update(updatedPerson.id, updatedPerson)
          .then(response => {
            console.log('Person updated and sent to server');
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson));
            setMessage(`${updatedPerson.name}'s number has been updated!`);
            setTimeout(() => setMessage(null), 5000);
            return;
          })
          .catch(error => {
            setMessage(`Error: ${error}`);
            setTimeout(() => setMessage(null), 5000);
          })
        return;
      } else {
        console.log('Canceling person creation/update')
        return;
      }
    }

    const newPersonToAdd = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1
    }
    console.log('adding person to list: ', newPersonToAdd)

    // EFFECT FOR PUSHING NEW PERSON
    setNewNumber('');
    setNewName('');

    numberServices.create(newPersonToAdd)
      .then(response => {
        console.log('Post action');
        setPersons(persons.concat(response));
        setMessage(`${newPersonToAdd.name} has been added to book.`);
        setTimeout(() => setMessage(null), 5000);
      }
      )
      .catch(err => {
        console.log('Error adding person. Create service message.')
        setMessage(`Error adding person to phonebook.`)
        setTimeout(() => setMessage(null), 5000);
      });

    /*
    axios.post('http://localhost:3001/persons', newPersonToAdd)
      .then(response => {
        console.log('setting persons', response);
        setPersons(persons.concat(response.data))
      })
      */
  }

  const removePerson = (personID, personName) => {
    if (window.confirm(`are you sure you want to delete ${personName}?`)) {
      numberServices.remove(personID);
      setPersons(persons.filter(person => person.id !== personID));
    }
  }

  return (
    <div>
      <h1>Phonebook PRODUCTION BUILD 1.0</h1>
      <Notification message={message} />
      <Filter handleSearch={handleSearch} searchTerm={searchTerm}
        handleSearchFormChange={handleSearchFormChange}
        setShowAll={setShowAll} showAll={showAll} />
      <h1>Add new entry</h1>
      <PersonForm handleSubmission={handleSubmission}
        newName={newName} handleNameFormChange={handleNameFormChange}
        newNumber={newNumber}
        handleNumberFormChange={handleNumberFormChange} />
      <h1>Numbers</h1>
      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  );
}

export default App;
