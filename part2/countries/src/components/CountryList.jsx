import Country from "./Country";
import { useState } from "react";

const CountryWithButton = ({ countryName, buttonHandler }) => {
  return (
    <div>
      {countryName}
      <button onClick={buttonHandler}>show</button>
    </div>
  );
};

const CountryList = ({ names, countries }) => {
  const [selectedCountryName, setSelectedCountryName] = useState(null);
  const getButtonHandler = (n) => {
    return () => {
      setSelectedCountryName(n);
    };
  };
  const selectedCountry =
    selectedCountryName === null
      ? null
      : countries.find((c) => c.name.common === selectedCountryName);
  const maybeCountryComponent =
    selectedCountry === null ? null : <Country country={selectedCountry} />;
  return (
    <div>
      {names.map((n) => (
        <CountryWithButton
          key={n}
          countryName={n}
          buttonHandler={getButtonHandler(n)}
        />
      ))}
      {maybeCountryComponent}
    </div>
  );
};

export default CountryList;
