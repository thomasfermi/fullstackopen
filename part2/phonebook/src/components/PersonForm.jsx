import { useState } from "react";
import personService from "../services/persons";

function isPhoneNumber(input) {
  const phoneRegex = /^[0-9]+(-[0-9]+)*$/;
  return phoneRegex.test(input);
}

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("0");

  const addPerson = (event) => {
    event.preventDefault();
    if (newName === "") {
      alert("You did not enter a name.");
    }
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook.`);
    } else if (!isPhoneNumber(newNumber)) {
      alert(`${newNumber} is not a valid phone number.`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

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
  );
};

export default PersonForm;
