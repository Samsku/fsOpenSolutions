import { useState, useEffect } from "react";
import "./App.css";

const WeatherInfo = ({ capital }) => {
    const apiKey = "";
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!capital) return;

        const fetchWeather = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`
                );
                if (!response.ok) throw new Error("Failed to fetch weather data");
                const data = await response.json();
                setWeather(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchWeather();
    }, [capital]);

    if (error) return <p className="error">Error: {error}</p>;
    if (!weather) return <p>Loading weather...</p>;

    return (
        <div className="weather">
            <h2>Weather in {capital}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Wind: {weather.wind.speed} m/s</p>
            <p>Humidity: {weather.main.humidity}%</p>
        </div>
    );
};

const CountryInfo = ({ country }) => (
    <div className="country-info">
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>

        <h2>Languages</h2>
        <ul>
            {Object.values(country.languages).map((lang) => (
                <li key={lang}>{lang}</li>
            ))}
        </ul>

        <img src={country.flags.png} alt={country.name.common} width="150" />
    </div>
);

const App = () => {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch(
                    "https://studies.cs.helsinki.fi/restcountries/api/all"
                );
                if (!res.ok) throw new Error("Failed to fetch countries");
                const data = await res.json();
                setCountries(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchCountries();
    }, []);

    const filtered = countries.filter((c) =>
        c.name.common.toLowerCase().includes(search.toLowerCase())
    );

    const countryToShow =
        filtered.length === 1 ? filtered[0] : selectedCountry;

    return (
        <div className="app">
            <h1>Country Data</h1>

            <input
                className="search-input"
                placeholder="Search countries..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedCountry(null);
                }}
            />

            {filtered.length > 10 && <p>Too many matches, specify more</p>}

            {countryToShow && (
                <>
                    <CountryInfo country={countryToShow} />
                    <WeatherInfo capital={countryToShow.capital} />
                </>
            )}

            {!countryToShow && filtered.length <= 10 && filtered.length > 1 && (
                <ul className="country-list">
                    {filtered.map((c) => (
                        <li key={c.cca3}>
                            {c.name.common}{" "}
                            <button onClick={() => setSelectedCountry(c)}>Show info</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default App;
