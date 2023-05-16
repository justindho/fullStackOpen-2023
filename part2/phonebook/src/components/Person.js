import { getAll, deletePerson } from "../services/persons"

const Person = ({person, setPersons}) => {
  const doDelete = (event) => {
    event.preventDefault()
    getAll()
      .then(persons => {
        if (persons.filter(p => p.name === person.name).length > 0) {
          if (window.confirm(`Delete ${person.name}?`)) {
            console.log(`Deleting person with id ${person.id}`)
            deletePerson(person.id)
              .then(response => console.log(`Successfully deleted ${person.name}`))
            // update 'persons' with 'setPersons'
            setPersons(persons.filter(p => p.id !== person.id))
          }
        } else {
          alert(`${person.name} has already been deleted`)
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