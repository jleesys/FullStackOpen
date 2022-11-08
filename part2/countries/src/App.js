
// should gather data from endpoint https://restcountries.com/v3.1/all

import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const [countries, setCountries] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [countriesToShow, setCountriesToShow] = useState([]);

  window.countries = countries;

  const handleSearchChange = (event) => {
    setSearchField(event.target.value);
    const arrayResults = findCountry(searchField);
    console.log(arrayResults);
  }

  const findCountry = (searchTerm) => {
    const search = searchTerm.toLowerCase();
    const arrayOfResults = [];
    console.log('executing search for', search);
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].name.common.toLowerCase().includes(search.toLowerCase()) || countries[i].name.official.toLowerCase().includes(search.toLowerCase())) {
        console.log(`found country ${countries[i].name.official}`);
        arrayOfResults.push(countries[i]);
      }
    }
    return arrayOfResults;
  }

  useEffect(() => {
    // console.log('promise created');
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        // console.log('promise fulfilled', response.data);
        setCountries(response.data);
      });
  }, [])

  return (
    <div>
      Find Countries
      <form>
        <input placeholder="country" autoFocus onChange={handleSearchChange}></input>
      </form>

    </div>
  );
}

export default App;
