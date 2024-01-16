import axios from 'axios';

const baseUrl = 'http://api.openweathermap.org/geo/1.0/direct';

const getLatLon = (cityName) => {
  const params = {
    q: cityName,
    limit: 5,
    appid: import.meta.env.VITE_OPEN_WEATHER_API_KEY
  };

  const request = axios.get(baseUrl, { params: params });
  return request.then(response => {
    if (response.data != null && response.data.length >= 1)
    {
        return {lat : response.data[0].lat, lon:response.data[0].lon}
    }
    throw new Error('No data found for the specified city.');
  });
};

export default { getLatLon };
