import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const Languages = ({ country }) => {
  return (
    <div>
      <h3>Languages</h3>
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

const Weather = ({ country }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    weatherService
      .getWeather(country.capital[0])
      .then((weather) => {
        setWeather(weather);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (weather != null) {
    const temperatureCelsius = weather.main.temp - 273.15;
    const windSpeed = weather.wind.speed;
    const icon = weather.weather[0].icon;
    return (
      <div>
        <h3>Weather in {country.capital[0]}</h3>
        <div>temperature: {temperatureCelsius.toFixed(2)} Celsius </div>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={"weather icon"}
        />
        <div>wind: {windSpeed.toFixed(2)} m/s</div>
      </div>
    );
  }
};

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <Capitals country={country} />
      <div>area: {country.area} km²</div>
      <Languages country={country} />
      <Flags country={country} />
      <Weather country={country} />
    </div>
  );
};
export default Country;
