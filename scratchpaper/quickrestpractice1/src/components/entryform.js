import { useState } from 'react';

const EntryForm = ({ handleSubmission }) => {
    const [expName, setExpName] = useState('');
    const [expAmt, setExpAmt] = useState();

    const createEntry = async (e) => {
        e.preventDefault();
        const newEntry = {
            name: expName,
            amount: expAmt
        };
        await handleSubmission(newEntry);
        setExpName('');
        setExpAmt('');
        e.target.reset();
    }

    return (
        <div>
            <h2>Entry Form</h2>
            <form type='submit' onSubmit={createEntry}>
                <div>
                    Expense Name
                    <input onChange={(event) => setExpName(event.target.value)} />
                </div>
                <div>
                    Monthly Amount Paid
                    <input onChange={(event) => setExpAmt(event.target.value)} />
                </div>
                <button>Submit</button>
            </form>
        </div>

    );
}

// export { EntryForm };
export default EntryForm;