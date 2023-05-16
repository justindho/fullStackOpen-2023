import { getAll, deletePerson } from "../services/persons"

const Person = ({person, setPersons, setNewSuccessMessage, setNewErrorMessage}) => {
  const doDelete = (event) => {
    event.preventDefault()
    getAll()
      .then(persons => {
        if (persons.filter(p => p.name === person.name).length > 0) {
          if (window.confirm(`Delete ${person.name}?`)) {
            deletePerson(person.id)
              .then(response => {
                console.log(`Successfully deleted ${person.name}`)
                setNewSuccessMessage(`Successfully deleted ${person.name}`)
                setTimeout(() => {
                  setNewSuccessMessage(null)
                }, 5000)
              })
              .catch(error => {
                console.log(error)
                setNewErrorMessage(`Information of ${person.name} has already been removed from server`)
                setTimeout(() => {
                  setNewErrorMessage(null)
                }, 5000)
                setPersons(persons)
              })
            // update 'persons' with 'setPersons'
            setPersons(persons.filter(p => p.id !== person.id))
          }
        } else {
          setNewErrorMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setNewErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== person.id))
        }
      })
  }
  return (
    <div>
      {person.name} {person.number}
      <form onSubmit={doDelete}>
        <button type="submit">delete</button>
      </form>
    </div>
  )
}

export default Person