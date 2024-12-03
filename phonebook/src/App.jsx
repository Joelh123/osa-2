import { useState } from 'react'

const Filter = ({ filterWith, handleFilterChange }) => (
  <div>filter shown with <input value={filterWith} onChange={handleFilterChange} /></div>
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filterWith, setFilterWith] = useState("")
  const [showAll, setShowAll] = useState(true)

  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.match(new RegExp(filterWith, "i")))

  const addInfo = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber,
      id: persons.at(-1).id + 1
    }

    for (const person of persons) {
      if (person.name === noteObject.name) {
        alert(`${noteObject.name} is already added to phonebook`)
        return
      }
    }

    setPersons(persons.concat(noteObject))
    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = (event) => (setNewName(event.target.value))

  const handleNumberChange = (event) => (setNewNumber(event.target.value))

  const handleFilterChange = (event) => {
    setFilterWith(event.target.value)
    setShowAll(false)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} filterwith={filterWith} handlefilterchange={handleFilterChange} />
      <h2>add a new</h2>
      <Personform addInfo={addInfo} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
      {/* {personsToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)} */}
    </div>
  )
}

export default App