import { useState } from 'react'

  const Button = function ({ text, updateVal, counter }) {
    return (
      <div>
        <button onClick={() => updateVal(counter + 1)}>{text}</button>
      </div>
    )
  }

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //  const updateVal = (event) => {
  //    setGood(good + 1);
  //    console.log(`good is at ${good}`)
  //  }


  return (
    <>
      <h1>give feedback</h1>
      <Button text='good' updateVal={setGood} counter={good} />
      <Button text='neutral' updateVal={setNeutral} counter={neutral} />
      <Button text='bad' updateVal={setBad} counter={bad} />
      <h1>Statistics</h1>
      <div>good : {good}</div>
      <div>neutral : {neutral}</div>
      <div>bad : {bad}</div>
      
    </>
  )
}

export default App
