import { useState } from 'react';
import EntryForm from './components/entryform';
import Expense from './components/expense';

function App() {
  const [expenses, setExpenses] = useState([]);

  const handleSubmission = async (entry) => {
    // console.log('Handling submission ', entry);
    const newExpenses = expenses.concat(entry);
    // console.log('new expenses ', newExpenses);
    setExpenses(newExpenses);
  };

  return (
    <div className="App">
      <h1>Recurring Payments</h1>
      <EntryForm handleSubmission={handleSubmission} />
      <h2>Expenses</h2>
      {expenses.map(expense => <Expense key={expense.name} expense={expense}/>)}
    </div>
  );
}

export default App;