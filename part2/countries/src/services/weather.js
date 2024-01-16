import axios from 'axios';
import geoService from "./geocoding";

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = (cityName) => {
    return geoService
      .getLatLon(cityName)
      .then((result) => {
         const params = {
            lat : result.lat,
            lon : result.lon,
            appid: import.meta.env.VITE_OPEN_WEATHER_API_KEY
          };

          const request = axios.get(baseUrl, { params: params });
          return request.then(response => response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
};

export default { getWeather };
