const personsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Person = require('../models/person')
const index = require('../index')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
]

var maara = persons.map(function(v) {
  return Object.keys(v).length
});

personsRouter.get('/', async(request, response) => {
  response.json(persons.map(Person.format))
})

personsRouter.get('/:id', async(request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if ( person ) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

personsRouter.post('/', async(request, response) => {
  const body = request.body
  const name = body.name
  const number = body.number
  const id = Math.floor(Math.random() * Math.floor(1000000))
  const person = {"name" : name, "number": number, "id": id}

  if (!person.name || !person.number || persons.find(person => person.name === name)) {
    response.status(400).end()
  } else {
    response.json(person)
  }
})


personsRouter.delete('/:id', async(request, response) => {
  const id = Number(request.body.id)
  person = persons.filter(person => person.id !== id)

  response.status(204).end()
})



module.exports = personsRouter