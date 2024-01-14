import { useEffect, useState } from "react";
import countryService from "./services/countries";
import CountryForm from "./components/CountryForm";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    console.log("useEffect running..");
    countryService
      .getAll()
      .then((data) => setCountries(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSearchStringChange = (event) => {
    setSearchString(event.target.value);
  };

  const maybeRenderCountrylist = () => {
    const names = countries
      .map((c) => c.name.common)
      .filter((countryName) =>
        countryName.toLowerCase().includes(searchString)
      );
    console.log(names);
    if (names.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (names.length > 1) {
      return names.map((n) => <div key={n}>{n}</div>);
    } else if (names.length === 1) {
      return (
        <Country country={countries.find((n) => n.name.common === names[0])} />
      );
    }
    return null;
  };

  return (
    <div>
      <h1>Countries</h1>
      <CountryForm
        searchString={searchString}
        handleSearchStringChange={handleSearchStringChange}
      />
      {maybeRenderCountrylist()}
    </div>
  );
};

export default App;
