import numberServices from '../services/numbers'

const Persons = ({ personsToShow, removePerson }) => {
    return (
        <>
            {personsToShow.map(person => {
                console.log('remapping persons');
                return <div key={person.id}>{person.name} {person.number}
                <button onClick={() => removePerson(person.id)}>delete</button></div>
            }
            )}
        </>
    )
}

export default Persons;