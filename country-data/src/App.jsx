import { useState, useEffect } from "react";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");

    const url = "https://studies.cs.helsinki.fi/restcountries/api/all";

    useEffect(() => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data")
                }
                return response.json()
            })
            .then(data => {
                setCountries(data);
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    const filtered = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <h1>Country Data</h1>
            Search: <input value={search} onChange={e => setSearch(e.target.value)} />
            {filtered.length > 10 ? <p>Too many matches, specify more</p> : (
                filtered.length === 1 ? (
                    <div>
                        <h1>{filtered[0].name.common}</h1>
                        <p>Capital: {filtered[0].capital}</p>
                        <p>Area: {filtered[0].area}</p>

                        <h2>Languages</h2>
                        <ul>
                            {Object.values(filtered[0].languages).map(language => (
                                <li key={language}>{language}</li>
                            ))}
                        </ul>
                        <img src={filtered[0].flags.png} alt={filtered[0].name.common} />
                    </div>
                ) : (
                    <ul>
                        {filtered.map(country => (
                            <li key={country.alpha3Code}>{country.name.common}</li>
                        ))}
                    </ul>
                )
            )}
        </div>
    )
}

export default App