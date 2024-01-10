import { useState } from "react";

const Person = ({person}) => {
  //console.log("Person:", person)
  return (
    <div>{person.name} {person.number}</div>
  )
}

function isPhoneNumber(input) {
  const phoneRegex = /^[0-9]+(-[0-9]+)*$/;
  return phoneRegex.test(input) && !input.startsWith('-') && !input.endsWith('-') && input.indexOf('--') === -1;
}



const Numbers = ({persons}) => {
  //console.log("Persons:", persons)
  const rendered_persons = persons.map(p => <Person key={p.id} person={p}/>)
  
  //console.log(rendered_persons)
  return (
    <div>
    <h2>Numbers</h2>
    {rendered_persons}
    </div>  
  )
}

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "040-1234567", id:0 }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("0");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {name : newName, number : newNumber, id : persons.length}
    if (newName === "")
    {
      alert("You did not enter a name.")
    }
    if (persons.some(person => person.name === newName))
    {
      alert(`${newName} is already added to phonebook.`)
    }
    else if (!isPhoneNumber(newNumber))
    {
      alert(`${newNumber} is not a valid phone number.`)
    }
    else {
      setPersons(persons.concat(newPerson))
      setNewName("")
    }    
  }


  return (
    <div>
      <h2>Phonebook</h2>
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
      <Numbers persons={persons}/>
    </div>
  );
};

export default App;
