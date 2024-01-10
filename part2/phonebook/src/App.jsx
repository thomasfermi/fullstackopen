import { useState } from "react";

const Person = ({person}) => {
  //console.log("Person:", person)
  return (
    <div>{person.name}</div>
  )
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
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id:0 }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {name : newName, id : persons.length}
    if (persons.some(person => person.name === newName))
    {
      alert(`${newName} is already added to phonebook`)
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
          <button type="submit">add</button>
        </div>
      </form>
      <Numbers persons={persons}/>
    </div>
  );
};

export default App;
