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

const formatPerson = (person) => {
  return {
    name: person.name,
    number: person.number,
    id: person.id
  }
}

personsRouter.get('/', async(request, response) => {
  Person
  .find({})
  .then(newpersons => {
    response.json(newpersons.map(formatPerson))
  })
  .catch(error => {
    console.log(error)
  })
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
  if (body.content === undefined) {
    return response.status(400).json
  }
  const person = new Person({
    "name" : body.name, 
    "number": body.number
  })
  person
  .save()
  .then(savedPerson => {
    response.json(formatPerson(savedPerson))
  })
})


personsRouter.delete('/:id', async(request, response) => {
  const id = Number(request.body.id)
  person = persons.filter(person => person.id !== id)

  response.status(204).end()
})



module.exports = personsRouter