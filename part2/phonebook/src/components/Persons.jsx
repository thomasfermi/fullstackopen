const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

const Persons = ({ persons, searchName }) => {
  const nameFitsSearchName = (name) => {
    return name.toLowerCase().includes(searchName);
  };
  const rendered_persons = persons
    .filter((p) => nameFitsSearchName(p.name))
    .map((p) => <Person key={p.id} person={p} />);

  return <div>{rendered_persons}</div>;
};

export default Persons;
