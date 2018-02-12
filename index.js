const http = require('http')
const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const personsRouter = require('./controllers/persons')
const infoRouter = require('./controllers/infocontroller')
const config = require('./utils/config')

const url = 'mongodb://atak:salis@ds233238.mlab.com:33238/osa3kanta'
mongoose.connect(url)
mongoose.Promise = global.Promise

const Person = mongoose.model('Person', {
  name: String,
  number: String,
})

app.get('/api/persons', async(request, response) => {
  Person
    .find({})
    .then(persons => {
      response.json(persons.map(Person.format))
    })
})

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
morgan.token('body', res => JSON.stringify(res.body))
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.body(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))
app.use(middleware.logger)
app.use(express.static('build'))
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/notes', notesRouter)
app.use('/api/persons', personsRouter)
app.use('/info', infoRouter)

app.use(middleware.error)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}