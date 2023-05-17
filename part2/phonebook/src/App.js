import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import SuccessMessage from './components/SuccessMessage'
import ErrorMessage from './components/ErrorMessage'

import { getAll } from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newSuccessMessage, setNewSuccessMessage] = useState(null)
  const [newErrorMessage, setNewErrorMessage] = useState(null)

  // get data from server
  useEffect(() => {
    getAll().then(data => setPersons(data))
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <SuccessMessage message={newSuccessMessage} />
      <ErrorMessage message={newErrorMessage} />

      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        setNewSuccessMessage={setNewSuccessMessage}
        setNewErrorMessage={setNewErrorMessage}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        setPersons={setPersons}
        filter={newFilter}
        setNewSuccessMessage={setNewSuccessMessage}
        setNewErrorMessage={setNewErrorMessage}
      />
    </div>
  )
}

export default App