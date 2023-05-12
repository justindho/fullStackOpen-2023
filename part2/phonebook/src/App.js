import { useState } from 'react'

const Entry = ({person}) => {
  return (
    <div>
      <p>{person.name} {person.number}</p>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPhonebookEntry = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName) !== undefined) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
  
      const newPersons = persons.concat(newPerson)
      setPersons(newPersons)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPhonebookEntry}>
        <div>
          <p>name: <input
            value={newName}
            onChange={handleNameChange}
          /></p>
          <p>number: <input
            value={newNumber}
            onChange={handleNumberChange}
          /></p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <Entry key={person.name} person={person} />)}
      </div>
    </div>
  )
}

export default App