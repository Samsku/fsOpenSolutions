import {useState} from 'react'
import FilterSearch from './components/FilterSearch'
import PersonForm from './components/PersonForm'
import NumbersDisplay from './components/NumbersDisplay'


const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
        { name: 'Emily Lovelace', number: '040-123456', id: 5 },
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState("");
    const [search, setSearch] = useState("");

    const addPerson = (e) => {
        e.preventDefault()
        const person = {
            name: newName,
            number: newNumber,
            id: persons.length+1,
        }
        if (persons.some(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
            return;
        } else {
            setPersons(persons.concat(person))
        }
        setNewName('')
        setNewNumber('');
        console.log(persons)
    }

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const filteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <h2>Phonebook</h2>
            <FilterSearch search={search} onChange={handleSearchChange} />
            <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
            <NumbersDisplay persons={filteredPersons} />
        </div>
    )
}

export default App