import { useState } from 'react'

const Button = function ({ text, updateVal, counter }) {
  return (
    <div>
      <button onClick={() => updateVal(counter + 1)}>{text}</button>
    </div>
  )
}

const Statistics = ({good,neutral,bad}) => {
  return (
    <>
      <div>good : {good}</div>
      <div>neutral : {neutral}</div>
      <div>bad : {bad}</div>
      <div>total: {good + neutral + bad}</div>
      <div>average: {((1 * good) + (-1 * bad)) / (good + bad + neutral)}</div>
      <div>positive: {(good) / (good + neutral + bad) * 100}%</div>
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
      <Statistics good={good} neutral={neutral} bad={bad} />
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
