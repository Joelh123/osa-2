import { useEffect, useState } from "react";
import countryService from "./service/countries"

const Filter = ({ filterWith, setFilterWith }) => {
  
  return (
    <div>find countries <input value={filterWith} onChange={(event) => setFilterWith(/[\w\s]*/.exec(event.target.value))} /></div>
  )
}

const Countries = ({ countriesToShow, filterWith }) => {

  console.log(countriesToShow.length)

  if (countriesToShow.length <= 1 && !filterWith) { return null }

  else if (countriesToShow.length > 10 && countriesToShow.length !== 0) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  else if (countriesToShow.length <= 10 && countriesToShow.length !== 0) {
    return (
      countriesToShow.map(country => <p key={country.cca2}>{country.name.common}</p>)
    )
  }
}

const SingleCountry = ({ countryToShow }) => {

  if (countryToShow.length === 1) {
    return (
      <div>
        <h1>{countryToShow[0].name.common}</h1>
        <p>capital {countryToShow[0].capital}<br/>area {countryToShow[0].area}km</p>
        <p><b>languages:</b></p>
        <ul>
          {Object.entries(countryToShow[0].languages).map(language => <li key={language[0]}>{language[1]}</li>)}
        </ul>
        <img src={countryToShow[0].flags.png} style={{maxHeight: "25vh"}} />
      </div>
    )
  } else {
    return null
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterWith, setFilterWith] = useState("")

  useEffect(() => {
    countryService
      .getAll()
      .then(response => setCountries(response))
  }, [])

  const countriesToShow = filterWith.length < 1
    ? []
    : countries.filter(country => country.name.common.match(new RegExp(filterWith, "i")))

  return (
    <div>
      <Filter filterWith={filterWith} setFilterWith={setFilterWith} />
      <Countries countriesToShow={countriesToShow} />
      <SingleCountry countryToShow={countriesToShow} />
    </div>
  )
}

export default App