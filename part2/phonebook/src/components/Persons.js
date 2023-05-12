import Person from './Person'

const Persons = ({persons, filter}) => {
  return (
    <div>
      {persons.filter(person => person.name.toLowerCase().startsWith(filter))
          .map(person => <Person key={person.name} person={person} />)}
    </div>
  )
}

export default Persons