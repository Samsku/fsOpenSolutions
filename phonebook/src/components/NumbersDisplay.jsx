const NumbersDisplay = ({ persons, onClick }) => (
    <>
        <h2>Numbers</h2>
        <div>
            {persons.map(person => (
                <p key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => onClick(person.id)}>Delete</button>
                </p>
            ))}
        </div>
    </>
);

export default NumbersDisplay;
