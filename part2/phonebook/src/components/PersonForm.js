const PersonForm = ({handleSubmission, newName, handleNameFormChange, newNumber, handleNumberFormChange}) => {
    return (
    <form onSubmit={handleSubmission}>
        <div>
            Name: <input placeholder={newName} onChange={handleNameFormChange} />
        </div>
        <div>
            Number: <input placeholder={newNumber} onChange={handleNumberFormChange} />
        </div>
        <button type="submit">add</button>
    </form>
    )
}

export default PersonForm;