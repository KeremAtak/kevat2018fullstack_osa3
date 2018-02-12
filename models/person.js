const mongoose = require('mongoose')
const url = 'mongodb://:@ds233238.mlab.com:33238/osa3kanta'
mongoose.connect(url)
mongoose.Promise = global.Promise

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person