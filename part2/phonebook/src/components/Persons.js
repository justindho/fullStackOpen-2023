import Person from './Person'

const Persons = ({persons, setPersons, filter}) => {
  return (
    <div>
      {persons.filter(person => person.name.toLowerCase().startsWith(filter))
          .map(person => <Person key={person.name} person={person} setPersons={setPersons} />)}
    </div>
  )
}

export default Persons