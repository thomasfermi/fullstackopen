import { useState } from 'react'
import personService from '../services/persons'

const PersonForm = ({ persons, setPersons, showNotification, showError }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('0')
  const newPerson = {
    name: newName,
    number: newNumber,
  }

  // if person with newName already exists, we might want to update it
  const maybeUpdatePerson = () => {
    const oldPerson = persons.find((person) => person.name === newName)
    if (
      window.confirm(
        `${oldPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      personService
        .update(oldPerson.id, newPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.name === newName ? returnedPerson : person
            )
          )
          setNewName('')
          showNotification(`Update number for ${oldPerson.name}`)
        })
        .catch((error) => {
          showError(error.response.data.error)
          return
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === '') {
      alert('You did not enter a name.')
    }
    if (persons.some((person) => person.name === newName)) {
      maybeUpdatePerson()
    } else {
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          showNotification(`Added ${returnedPerson.name}`)
        })
        .catch((error) => showError(error.response.data.error))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
