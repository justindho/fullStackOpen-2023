// Important to import 'dotenv' before all other modules so that env vars are available globally
require('dotenv').config()

const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
const requestLogger = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}
app.use(morgan(requestLogger))

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

// This needs to be the last loaded middleware.
app.use(errorHandler)

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.post('/api/persons', (request, response) => {
  if (!request.body.name) {
    return response.status(400).json({
      error: 'Name is missing'
    })
  }
  
  if (!request.body.number) {
    return response.status(400).json({
      error: 'Number is missing'
    })
  }

  if (Person.findById(request.params.id)) {
    const body = request.body
    const person = {
      name: body.name,
      number: body.number,
    }
    Person.findByIdAndUpdate(request.params.id, person,{ new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  }
  
  const newPerson = new Person({
    id: Math.floor(Math.random() * 1000),
    name: request.body.name,
    number: request.body.number
  })

  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  console.log(`Deleting person`)
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    const text = `Phonebook has info for ${persons.length} people<br/><br/>${new Date()}`
    response.send(text)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})