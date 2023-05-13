import { create } from '../services/persons'

const PersonForm = ({persons, setPersons, newName, handleNameChange, newNumber, handleNumberChange}) => {

  const addPhonebookEntry = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName) !== undefined) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      create(newPerson)
        .then(response => console.log(response))
  
      const newPersons = persons.concat(newPerson)
      setPersons(newPersons)
    }
  }

  return (
    <div>
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
    </div>
  )
}

export default PersonForm