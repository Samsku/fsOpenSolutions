import { useState, useEffect } from 'react';
import axios from 'axios';
import FilterSearch from './components/FilterSearch';
import PersonForm from './components/PersonForm';
import NumbersDisplay from './components/NumbersDisplay';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [search, setSearch] = useState('');

    // Load initial data
    useEffect(() => {
        axios.get('http://localhost:3001/persons')
            .then(response => setPersons(response.data))
            .catch(error => console.error(error));
    }, []);

    // Add or update person
    const addPerson = (e) => {
        e.preventDefault();
        const existingPerson = persons.find(p => p.name === newName);

        if (existingPerson) {
            const updatedPerson = { ...existingPerson, number: newNumber };
            axios.put(`http://localhost:3001/persons/${existingPerson.id}`, updatedPerson)
                .then(res => setPersons(persons.map(p => p.id !== existingPerson.id ? p : res.data)))
                .catch(err => console.error(err));
        } else {
            const newPerson = { name: newName, number: newNumber };
            axios.post('http://localhost:3001/persons', newPerson)
                .then(res => setPersons(persons.concat(res.data)))
                .catch(err => console.error(err));
        }

        setNewName('');
        setNewNumber('');
    };

    // Delete person
    const deletePerson = (id) => {
        const person = persons.find(p => p.id === id);
        if (!person) return;

        if (window.confirm(`Delete ${person.name}?`)) {
            axios.delete(`http://localhost:3001/persons/${id}`)
                .then(() => setPersons(persons.filter(p => p.id !== id)))
                .catch(err => console.error(err));
        }
    };

    const handleNameChange = (e) => setNewName(e.target.value);
    const handleNumberChange = (e) => setNewNumber(e.target.value);
    const handleSearchChange = (e) => setSearch(e.target.value);

    const filteredPersons = persons.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <FilterSearch search={search} onChange={handleSearchChange} />
            <PersonForm
                addPerson={addPerson}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                newName={newName}
                newNumber={newNumber}
            />
            <NumbersDisplay persons={filteredPersons} onClick={deletePerson} />
        </div>
    );
};

export default App;
