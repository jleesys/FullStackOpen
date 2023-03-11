import EntryForm from './components/entryform';
import Expense from './components/expense';

function App() {
  return (
    <div className="App">
      <h1>Recurring Payments</h1>
      <EntryForm />

      <h2>Expenses</h2>
      <Expense/>
    </div>
  );
}

export default App;