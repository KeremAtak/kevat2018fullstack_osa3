const infoRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const personsRouter = require('./persons')
const index = require('../index')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

infoRouter.get('/', async (request, response) => {
  const count = 0
  const date = new Date();

  response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
  response.write('puhelinluettelossa ' + count + ' henkilön tiedot'+'</br>');
  response.write(' '+ date);
  response.end();
})

module.exports = infoRouter