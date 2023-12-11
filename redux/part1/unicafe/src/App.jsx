import { useState } from 'react'

const Button = function ({ text, updateVal, counter }) {
  return (
    <div>
      <button onClick={() => updateVal(counter + 1)}>{text}</button>
    </div>
  )
}

//<div><tr><td>good:</td> <td>{good}</td></tr></div>
//<div>bad: {bad}</div>
//<div>total: {good + neutral + bad}</div>
//<div>average: {((1 * good) + (-1 * bad)) / (good + bad + neutral)}</div>
//<div>positive: {(good) / (good + neutral + bad) * 100}%</div>
//<div>neutral: {neutral}</div>
const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      <table>
        <tbody>
          <Part text={'good'} value={good} />
          <Part text={'neutral'} value={neutral} />
          <Part text={'bad'} value={bad} />
          <Part text={'total'} value={good + neutral + bad} />
          <Part text={'average'} value={((1 * good) + (-1 * bad)) / (good + bad + neutral)}/>
          <Part text={'positive'} value={`${(good) / (good + neutral + bad) * 100}%`}/>
        </tbody>
      </table>
    </>
  )
}

const Part = ({ text, value }) => {
  return (
    <>
      <>
        <tr><td>{text}</td><td>{value}</td></tr>
      </>
    </>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <Button text='good' updateVal={setGood} counter={good} />
      <Button text='neutral' updateVal={setNeutral} counter={neutral} />
      <Button text='bad' updateVal={setBad} counter={bad} />
      {
        (good + neutral + bad === 0) ?
          'No feedback.' :
          <Statistics good={good} neutral={neutral} bad={bad} />
      }
    </>
  )
}

//<h1>Statistics</h1>
//<div>good : {good}</div>
//<div>neutral : {neutral}</div>
//<div>bad : {bad}</div>
//<div>total: {good + neutral + bad}</div>
//<div>average: {((1 * good) + (-1 * bad)) / (good + bad + neutral)}</div>
//<div>positive: {(good) / (good + neutral + bad) * 100}%</div>
export default App
