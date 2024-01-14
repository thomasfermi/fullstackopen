const Languages = ({ country }) => {
  console.log(country.languages);
  return (
    <div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={`lang-${lang}`}>{lang}</li>
        ))}
      </ul>
    </div>
  );
};

const Capitals = ({ country }) => {
  return (
    <div>
      capital:{" "}
      {country.capital.map((c) => (
        <span key={`capital-${c}`}>{c}</span>
      ))}
    </div>
  );
};

const Flags = ({ country }) => {
  return <img src={country.flags.png} alt={country.flags.alt} />;
};

const Country = ({ country }) => {
  console.log(country);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <Capitals country={country} />
      <div>area: {country.area}</div>
      <Languages country={country} />
      <Flags country={country} />
    </div>
  );
};
export default Country;
