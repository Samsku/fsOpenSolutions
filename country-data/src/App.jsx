import { useState, useEffect } from "react";

const CountryInfo = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>

            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.name.common} width="150" />
        </div>
    );
};

const App = () => {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);

    const url = "https://studies.cs.helsinki.fi/restcountries/api/all";

    useEffect(() => {
        fetch(url)
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch data");
                return response.json();
            })
            .then((data) => setCountries(data))
            .catch((error) => console.error(error));
    }, []);

    const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h1>Country Data</h1>
            Search:{" "}
            <input
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedCountry(null); // reset selected when searching again
                }}
            />

            {filtered.length > 10 ? (
                <p>Too many matches, specify more</p>
            ) : filtered.length === 1 ? (
                <CountryInfo country={filtered[0]} />
            ) : selectedCountry ? (
                <CountryInfo country={selectedCountry} />
            ) : (
                <ul>
                    {filtered.map((country) => (
                        <li key={country.cca3}>
                            {country.name.common}{" "}
                            <button onClick={() => setSelectedCountry(country)}>Show info</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default App;
