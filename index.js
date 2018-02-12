const http = require('http')
const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const personsRouter = require('./controllers/persons')
const config = require('./utils/config')

mongoose.connect(config.mongoUrl)

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(middleware.error)
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
app.use('/api/persons', personsRouter)

app.get('/', async (request, response) => {
  const count = 0
  const date = new Date();

  response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
  response.write('puhelinluettelossa ' + count + ' henkilön tiedot'+'</br>');
  response.write(' '+ date);
  response.end();
})

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