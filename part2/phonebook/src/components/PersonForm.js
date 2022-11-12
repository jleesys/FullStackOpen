const PersonForm = ({handleSubmission, newName, handleNameFormChange, newNumber, handleNumberFormChange}) => {
    return (
    <form onSubmit={handleSubmission}>
        <div>
            Name: <input placeholder={'name'} onChange={handleNameFormChange} value={newName} />
        </div>
        <div>
            Number: <input placeholder={'number'} onChange={handleNumberFormChange} value={newNumber}/>
        </div>
        <button type="submit">add</button>
    </form>
    )
}

export default PersonForm;