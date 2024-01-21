import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [notification, setNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);

  const showError = (errorMsg) => {
    setErrorNotification(errorMsg);
    setTimeout(() => {
      setErrorNotification(null);
    }, 3000);
  };
  const showNotification = (notification) => {
    setNotification(notification);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} type={"success"} />
      <Notification notification={errorNotification} type={"failure"} />
      <Filter searchName={searchName} setSearchName={setSearchName} />
      <h3>Add a new number</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        showNotification={showNotification}
        showError={showError}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        setPersons={setPersons}
        searchName={searchName}
        showError={showError}
      />
    </div>
  );
};

export default App;
