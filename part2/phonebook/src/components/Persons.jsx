import personService from "../services/persons";

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

const Persons = ({ persons, setPersons, searchName, showError }) => {
  const nameFitsSearchName = (name) => {
    return name.toLowerCase().includes(searchName);
  };
  const get_person_delete_func = (person) => {
    return () => {
      if (
        window.confirm(
          `Do you really want to delete the entry for ${person.name}?`
        )
      ) {
        personService.remove(person.id).catch((_error) => {
          showError(
            `Information of ${person.name} has already been removed from server.`
          );
        });
        setPersons(persons.filter((p) => p.id !== person.id));
      }
    };
  };
  const rendered_persons = persons
    .filter((p) => nameFitsSearchName(p.name))
    .map((p) => {
      return (
        <div key={p.id}>
          <Person person={p} />
          <button onClick={get_person_delete_func(p)}>delete</button>
        </div>
      );
    });

  return <div>{rendered_persons}</div>;
};

export default Persons;
