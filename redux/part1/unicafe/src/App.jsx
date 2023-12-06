import { useState } from 'react'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //  const onClick = (event) => {
  //    setGood(good + 1);
  //    console.log(`good is at ${good}`)
  //  }


  const Button = function ({ text, onClick, counter }) {
    return (
      <div>
        <button onClick={() => onClick(counter + 1)}>{text}</button>
      </div>
    )
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button text='good' onClick={setGood} counter={good} />
      <Button text='neutral' onClick={setNeutral} counter={neutral} />
      <Button text='bad' onClick={setBad} counter={bad} />
      <h1>Statistics</h1>
      <div>{good}</div>
      <div>{neutral}</div>
      <div>{bad}</div>
      
    </>
  )
}

export default App
