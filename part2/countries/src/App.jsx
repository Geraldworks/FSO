import { useState, useEffect } from "react";
import services from "./services/services";

const Country = ({ country }) => {
  return <h2>{country}</h2>;
};

const Capital = ({ capital }) => {
  return <p>capital {capital}</p>;
};

const Area = ({ area }) => {
  return <p>area {area}</p>;
};

const Languages = ({ languages }) => {
  return (
    <div>
      <h4>Languages:</h4>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
    </div>
  );
};

const Image = ({ imageURL, imageAlt }) => {
  return (
    <div>
      <br />
      <img src={imageURL} alt={imageAlt} />
    </div>
  );
};

const Weather = ({ capital, temp, speed, weatherImageUrl }) => {
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature {temp} Celsius</p>
      <img src={weatherImageUrl} alt="" />
      <p>Wind {speed} m/s</p>
    </div>
  );
};

const SpecificCountry = ({ data }) => {
  const country = data.name.common; // string
  const capital = data.capital; // string
  const area = data.area; // integer
  const languages = Object.values(data.languages); // list
  const flags = data.flags; // object of information

  return (
    <div>
      <Country country={country} />
      <Capital capital={capital} />
      <Area area={area} />
      <Languages languages={languages} />
      <Image imageURL={flags.png} imageAlt={flags.alt} />
      <Weather
        capital={capital}
        temp={data.temp}
        speed={data.speed}
        weatherImageUrl={data.icon}
      />
    </div>
  );
};

const CountryZoomIn = ({ country, handleSpecificCountry }) => {
  return (
    <p>
      {country}{" "}
      <button onClick={() => handleSpecificCountry(country)}>show</button>
    </p>
  );
};

const ManyCountries = ({ countries, handleSpecificCountry }) => {
  return (
    <div>
      {countries.map((country) => (
        <CountryZoomIn
          key={country.name.common}
          country={country.name.common}
          handleSpecificCountry={handleSpecificCountry}
        />
      ))}
    </div>
  );
};

const CountryDisplay = ({ lst, search, handleSpecificCountry }) => {
  if (search === "") {
    return <div>You currently do not have a filter!</div>;
  }
  if (lst.length === 0) {
    return <div>No matches Found!</div>;
  } else if (lst.length === 1) {
    return <SpecificCountry data={lst[0]} />;
  } else if (lst.length <= 10) {
    return (
      <ManyCountries
        countries={lst}
        handleSpecificCountry={handleSpecificCountry}
      />
    );
  } else {
    return <div>Too many matches, specify another filter!</div>;
  }
};

const CountryFilter = ({ search, handler }) => {
  return (
    <div>
      find countries{" "}
      <input
        value={search}
        onChange={(event) => {
          handler(event.target.value);
        }}
      />
    </div>
  );
};

const App = () => {
  const [search, setSearch] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Pull Data Once
  useEffect(() => {
    services.getAll().then((results) => setAllResults(results));
  }, []);

  // Filter Frequently
  useEffect(() => {
    const results = allResults.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    if (results.length === 1) {
      const lat = results[0].capitalInfo.latlng[0];
      const lon = results[0].capitalInfo.latlng[1];
      services.getWeatherInfo(lat, lon).then((data) => {
        results[0] = { ...results[0], ...data };
        setSearchResults(results);
      });
    } else {
      setSearchResults(results);
    }
  }, [search]);

  // Handling of specific country will be setting the search result
  // To be exactly the country name and using setSearch handler
  // The entire app will be re rendered with a searchResult of hopefully 1 item
  const handleSpecificCountry = (countryName) => {
    setSearch(countryName);
  };

  return (
    <div>
      <CountryFilter search={search} handler={setSearch} />
      <CountryDisplay
        lst={searchResults}
        search={search}
        handleSpecificCountry={handleSpecificCountry}
      />
    </div>
  );
};

export default App;
