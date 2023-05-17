const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
const morganMiddleware = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}
app.use(morgan(morganMiddleware))


let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
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
  
  if (persons.find(p => p.name === request.body.name)) {
    return response.status(400).json({
      error: 'Name must be unique'
    })
  }
  
  const id = Math.floor(Math.random() * 1000)
  const newPerson = {
    id: id,
    name: request.body.name,
    number: request.body.number
  }
  persons = persons.concat(newPerson)
  response.json(newPerson)
})

app.delete('/api/person/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.get('/info', (request, response) => {
  const text = `Phonebook has info for ${persons.length} people<br/><br/>${new Date()}`
  response.send(text)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})