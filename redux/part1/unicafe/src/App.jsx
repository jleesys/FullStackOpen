import { useState } from 'react'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //  const onClick = (event) => {
  //    setGood(good + 1);
  //    console.log(`good is at ${good}`)
  //  }


  const Button = function ({ text, onClick }) {
    return (
      <div>
        <button onClick={onClick}>{text}</button>
      </div>
    )
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button text='test button' />
      <button>good</button>
      <button>neutral</button>
      <button>bad</button>
      <h1>Statistics</h1>
    </>
  )
}

export default App
