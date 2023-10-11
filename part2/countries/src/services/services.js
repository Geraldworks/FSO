import axios from "axios";

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api";

const createWeatherURL = (lat, lon) => {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
    import.meta.env.VITE_WEATHER_API_KEY
  }`;
};

const createWeatherImageUrl = (icon) => {
  return `https://openweathermap.org/img/wn/${icon}@4x.png`;
};

const getAll = async () => {
  return axios.get(`${baseURL}/all`).then((response) => response.data);
};

const getWeatherInfo = async (lat, lon) => {
  const resp = axios.get(createWeatherURL(lat, lon));
  return resp.then((response) => {
    const data = response.data;
    return {
      speed: data.wind.speed,
      temp: (data.main.temp - 273.15).toFixed(2),
      icon: createWeatherImageUrl(data.weather[0].icon),
    };
  });
};

export default { getAll, getWeatherInfo };
