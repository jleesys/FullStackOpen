const Persons = ({ personsToShow }) => {
    return (
        <>
            {personsToShow.map(person => {
                console.log('remapping persons');
                return <div key={person.id}>{person.name} {person.number}</div>
            }
            )}
        </>
    )
}

export default Persons;