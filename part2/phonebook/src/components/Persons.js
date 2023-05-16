import Person from './Person'

const Persons = ({persons, setPersons, filter, setNewSuccessMessage, setNewErrorMessage}) => {
  return (
    <div>
      {persons.filter(person => person.name.toLowerCase().startsWith(filter))
          .map(person => <Person
            key={person.name}
            person={person}
            setPersons={setPersons}
            setNewSuccessMessage={setNewSuccessMessage}
            setNewErrorMessage={setNewErrorMessage}
          />)}
    </div>
  )
}

export default Persons