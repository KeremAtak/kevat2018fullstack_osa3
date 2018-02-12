const mongoose = require('mongoose')

const url = 'mongodb://atak:salis@ds233238.mlab.com:33238/osa3kanta'

mongoose.connect(url)
mongoose.Promise = global.Promise

const Person = mongoose.model('Person', {
  name: String,
  number: String,
})

var nimi = process.argv[2]
var numero = process.argv[3]

if(!nimi || !numero) {
  Person
  .find({})
  .then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: nimi,
    number: numero
  })

  person
    .save()
    .then(response => {
      console.log('lisätään henkilö %s numero %s luetteloon', nimi, numero)
      mongoose.connection.close()
    })
}
