import { useEffect, useState } from 'react'
import personService from "./service/persons"

const Filter = ({ filterWith, setFilterWith }) => (
  <div>filter shown with <input value={filterWith} onChange={(event) => setFilterWith(event.target.value)} /></div>
)

const Personform = ({ addInfo, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <form onSubmit={addInfo}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
  </form>
)

const Persons = ({ personsToShow, deletePerson }) => (
    personsToShow.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></p>)
  )

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filterWith, setFilterWith] = useState("")

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = filterWith.length < 1
  ? persons
  : persons.filter(person => person.name.match(new RegExp(filterWith, "i")))

  const addInfo = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const foundPerson = persons.find(person => person.name === newName)

    if (foundPerson === undefined) {
      personService
        .create(personObject)
        .then(response => setPersons(persons.concat(response)))
    } else if (window.confirm(`${foundPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
      personService
        .update(foundPerson.id, personObject)
        .then(response => setPersons(persons.map(person => person.id === response.id ? response : person)))
    }
  }

  const handleNameChange = (event) => (setNewName(event.target.value))

  const handleNumberChange = (event) => (setNewNumber(event.target.value))

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(response => setPersons(persons.filter(person => person.id !== response.id)))
    } else return
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} filterwith={filterWith} setFilterWith={setFilterWith} />
      <h2>add a new</h2>
      <Personform addInfo={addInfo} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App