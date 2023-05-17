import { create, update } from '../services/persons'

const PersonForm = ({persons, setPersons, newName, handleNameChange, newNumber, handleNumberChange, setNewSuccessMessage, setNewErrorMessage}) => {

  const addPhonebookEntry = (event) => {
    event.preventDefault()

    let foundPerson

    if ((foundPerson = persons.find(person => person.name === newName)) !== undefined) {
      alert(`${newName} is already added to phonebook, replace the older number with a new one?`)
      const updatedPerson = {
        ...foundPerson,
        name: newName,
        number: newNumber,
      }
      update(foundPerson.id, updatedPerson)
        .then(response => {
          setNewSuccessMessage(`Updated ${response.data.name}`)
          setTimeout(() => {
            setNewSuccessMessage(null)
          }, 5000)
        })
      const newPersons = [...persons]
      newPersons[foundPerson.id - 1] = updatedPerson
      setPersons(newPersons)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      create(newPerson)
        .then(response => {
          setNewSuccessMessage(`Added ${response.data.name}`)
          setTimeout(() => {
            setNewSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setNewErrorMessage(error.response.data.error)
          setTimeout(() => {
            setNewErrorMessage(null)
          }, 5000)
        })
  
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