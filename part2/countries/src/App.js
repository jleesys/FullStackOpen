
// should gather data from endpoint https://restcountries.com/v3.1/all

import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const [countries, setCountries] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [capitalWeather, setCapitalWeather] = useState();

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

  const CountryDetail = (props) => {
    let country = props.country;
    useEffect(() => {
      console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`)
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`)
        // .get(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${process.env.REACT_APP_API_KEY}`)
        .then(console.log('promise for weather at capital is fulfilled'))
    }, countriesToShow)

    return (
      // arrayOfResults.map(country => <div>{country.name.official} is the final result</div>)
      <>
        <h3>{country.name.official}</h3>
        <div>
          common name: {country.name.common} <br />
          capital {country.capital} <br />
          area {country.area} <br />
          population {country.population} <br />
        </div>
        <div>
          <h4>languages:</h4>
          <ul>
            {Object.keys(country.languages).map(lang => <li key={country.name.official}>{country.languages[lang]}</li>)}
          </ul>
        </div>
        <img src={country.flags.png}></img>
        <h3>Weather in {country.capital}</h3>
        temperature { }
      </>
    )
  }

  const ResultsDisplay = (props) => {
    let arrayOfResults = props.results;

    /*
    const setResult = (country) => {
      console.log();
      arrayOfResults = [country];
    }
    */

    if (arrayOfResults.length <= 10 && arrayOfResults.length > 1) {
      return (
        arrayOfResults.map(country => <div>{country.name.official} <button onClick={() => setCountriesToShow([country])}>show</button></div>)
      )
    } else if (arrayOfResults.length == 1) {
      const country = arrayOfResults[0];
      console.log(country);
      // console.log(country.languages);
      return (
        <>
          <CountryDetail country={country} />
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
