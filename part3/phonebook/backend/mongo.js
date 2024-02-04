const mongoose = require('mongoose')

const showErrorOnConsoleAndClose = () => {
  console.log(
    'Too many arguments.\nProper usage:\nOption 1:\n\tnode mongo.js password\nOption2:\n\tnode mongo.js password name phoneNumber'
  )
  process.exit(1)
}

const connectDbAndReturnPersonModel = () => {
  const password = process.argv[2]

  const url = `mongodb+srv://mariotheers:${password}@fullstack3c.u2himwp.mongodb.net/?retryWrites=true&w=majority`

  mongoose.set('strictQuery', false)
  mongoose.connect(url)

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const PersonModel = mongoose.model('PersonModel', personSchema)

  return PersonModel
}

const addPerson = () => {
  PersonModel = connectDbAndReturnPersonModel()

  const person = new PersonModel({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then((result) => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}

const showAllPersons = () => {
  PersonModel = connectDbAndReturnPersonModel()

  console.log('phonebook:')
  PersonModel.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

switch (process.argv.length) {
case 5:
  addPerson()
  break
case 3:
  showAllPersons()
  break
default:
  showErrorOnConsoleAndClose()
}
