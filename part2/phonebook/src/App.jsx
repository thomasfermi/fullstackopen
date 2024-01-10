import { useState } from "react";

const Person = ({ person }) => {
  //console.log("Person:", person)
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

function isPhoneNumber(input) {
  const phoneRegex = /^[0-9]+(-[0-9]+)*$/;
  return (
    phoneRegex.test(input) 
  );
}

const Numbers = ({ persons, searchName }) => {
  //console.log("Persons:", persons)
  const nameFitsSearchName = (name) => {
    return name.toLowerCase().includes(searchName)
  }
  const rendered_persons = persons
    .filter((p) => nameFitsSearchName(p.name))
    .map((p) => <Person key={p.id} person={p} />);

  //console.log(rendered_persons)
  return (
    <div>
      <h2>Numbers</h2>
      {rendered_persons}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 0 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 1 },
    { name: "Dan Abramov", number: "12-43-234345", id: 2 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 3 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("0");
  const [searchName, setSearchName] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber, id: persons.length };
    if (newName === "") {
      alert("You did not enter a name.");
    }
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook.`);
    } else if (!isPhoneNumber(newNumber)) {
      alert(`${newNumber} is not a valid phone number.`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      Filter for name:{" "}
      <input value={searchName} onChange={handleSearchNameChange} />
      <h2>Add a new number</h2>
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
      <Numbers persons={persons} searchName={searchName} />
    </div>
  );
};

export default App;
