const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@fullstackopen-phonebook.59rssev.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// fetch all people
if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: 'Anna',
    number: '040-1234556',
  })
  
  person.save().then(result => {
    console.log(`Added ${person.name} to phonebook`)
    mongoose.connection.close()
  })
}
