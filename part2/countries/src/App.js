
// should gather data from endpoint https://restcountries.com/v3.1/all

import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const [countries, setCountries] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [countriesToShow, setCountriesToShow] = useState([]);

  window.countries = countries;
  window.countriesToShow = countriesToShow;

  const handleSearchChange = (event) => {
    setSearchField(event.target.value);
    const arrayResults = findCountry(searchField);
    // console.log(arrayResults);
    setCountriesToShow(arrayResults);
  }

  const findCountry = (searchTerm) => {
    const search = searchTerm.toLowerCase();
    const arrayOfResults = [];
    // console.log('executing search for', search);
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].name.common.toLowerCase().includes(search.toLowerCase()) || countries[i].name.official.toLowerCase().includes(search.toLowerCase())) {
        // console.log(`found country ${countries[i].name.official}`);
        arrayOfResults.push(countries[i]);
      }
    }
    return arrayOfResults;
  }

  const ResultsDisplay = (props) => {
    const arrayOfResults = props.results;
    if (arrayOfResults.length <= 10 && arrayOfResults.length > 1) {
      return (
        arrayOfResults.map(country => <div>{country.name.official}</div>)
      )
    } else if (arrayOfResults.length == 1) {
      const country = arrayOfResults[0];
      console.log(country);
      console.log(country.languages);
      return (
        // arrayOfResults.map(country => <div>{country.name.official} is the final result</div>)
        <>
          <h3>{country.name.official}</h3>
          <div>
            capital {country.capital} <br />
            area {country.area}
          </div>
          <div>
            <h4>languages:</h4>
            <ul>
              {/* {country.languages.map(lang => <li>lang</li>)} */}
              {Object.keys(country.languages).map(lang => <li>{country.languages[lang]}</li>)}
            </ul>
          </div>
        </>
      )
    } else if (arrayOfResults.length == 0) {
      return (
        <div></div>
      )
    }
    return (
      <div>Too many matches. Please narrow search terms</div>
    )
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
      {/* {(countriesToShow.length <= 10) ? countriesToShow.map(country => <div>{country.name.official}</div>) : 'Too many matches. Please narrow search terms'} */}
      <ResultsDisplay results={countriesToShow} />
    </div>
  );
}

export default App;
