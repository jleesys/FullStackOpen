import { useState } from 'react';
import EntryForm from './components/entryform';
import Expense from './components/expense';
import ExpensesView from './components/expensesview';
import Togglable from './components/togglable';

function App() {
  const [expenses, setExpenses] = useState([]);

  const handleSubmission = async (entry) => {
    // console.log('Handling submission ', entry);
    const newExpenses = expenses.concat(entry);
    // console.log('new expenses ', newExpenses);
    setExpenses(newExpenses);
  };

  const deleteExpense = (expense) => {
    //delete the expense here
    const newExpenses = expenses.filter(item => item.name !== expense.name)
    setExpenses(newExpenses);
  }

  return (
    <div className="App">
      <h1>Recurring Payments</h1>
      <Togglable buttonText={'Create Entry'}>
        <EntryForm handleSubmission={handleSubmission} />
      </Togglable>
      <ExpensesView expenses={expenses} deleteExpense={deleteExpense} />
      {/* <h2>Expenses</h2>
      {expenses.map(expense => <Expense key={expense.name} expense={expense}/>)} */}
    </div>
  );
}

export default App;