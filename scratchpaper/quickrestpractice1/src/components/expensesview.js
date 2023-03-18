import { useState } from 'react';
import Expense from './expense';

const ExpensesView = ({ expenses, deleteExpense }) => {
    const [showDetails, setShowDetails] = useState(false);
    const handleDetailChange = (e) => {
        e.preventDefault();
        setShowDetails(!showDetails);
    }
    // const handleDeletion = () => {
    //     e.preventDefault();
    //     deleteExpense()
    // }
    return (
        <div>
            <h2>Expenses</h2>
            <button onClick={handleDetailChange}>Edit</button>
            {!showDetails ?
                expenses.map(expense => <Expense key={expense.name} expense={expense} />)
                : expenses.map(expense => <div>
                    <Expense key={expense.amount} expense={expense} />
                    <button onClick={(e) => {
                        e.preventDefault();
                        deleteExpense(expense);
                    } }>Delete</button>
                </div>)}
        </div>
    )
}

export default ExpensesView;