import {useState, useEffect} from 'react'
import FilterSearch from './components/FilterSearch'
import PersonForm from './components/PersonForm'
import NumbersDisplay from './components/NumbersDisplay'
import axios from 'axios'


const App = () => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState("");
    const [search, setSearch] = useState("");

    const [persons, setPersons] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

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