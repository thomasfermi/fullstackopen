const Filter = ({ searchName, setSearchName }) => {
  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value);
  };

  return (
    <div>
      Filter for name:{" "}
      <input value={searchName} onChange={handleSearchNameChange} />
    </div>
  );
};

export default Filter;
