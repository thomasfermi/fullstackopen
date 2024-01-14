const CountryForm = ({ searchString, handleSearchStringChange }) => {
  return (
    <form>
      <div>
        find countries:{" "}
        <input value={searchString} onChange={handleSearchStringChange} />
      </div>
    </form>
  );
};

export default CountryForm;
