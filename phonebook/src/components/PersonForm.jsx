const PersonForm = ({addPerson, handleNameChange, handleNumberChange, newName, newNumber}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input type="text" onChange={handleNameChange} value={newName}/>
                number: <input type="text" onChange={handleNumberChange} value={newNumber}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;