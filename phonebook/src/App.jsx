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

const Persons = ({ personsToShow }) => (
  <div>
    {personsToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
  </div>
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
    const noteObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(noteObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })

    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = (event) => (setNewName(event.target.value))

  const handleNumberChange = (event) => (setNewNumber(event.target.value))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} filterwith={filterWith} setFilterWith={setFilterWith} />
      <h2>add a new</h2>
      <Personform addInfo={addInfo} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App