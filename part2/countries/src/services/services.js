import axios from "axios";

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api";

const createWeatherURL = (lat, lon) => {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
    import.meta.env.VITE_WEATHER_API_KEY
  }`;
};

const getAll = async () => {
  return axios.get(`${baseURL}/all`).then((response) => response.data);
};

const getWeatherInfo = async (lat, lon) => {
  const resp = axios.get(createWeatherURL(lat, lon));
  return resp.then((response) => {
    console.log(response);
    const data = response.data;
    return {
      speed: data.wind.speed,
      temp: data.main.temp,
      icon: data.weather[0].icon,
    };
  });
};

export default { getAll, getWeatherInfo };
