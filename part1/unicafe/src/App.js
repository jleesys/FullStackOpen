import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatsLine = (props) => {
  return (
    <>{props.text} {props.quantity}<br /></>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => () => {
    setGood(good + 1);
  }

  const incrementNeutral = () => () => {
    setNeutral(neutral + 1);
  }

  const incrementBad = () => () => {
    setBad(bad + 1);
  }

  const incrementState = (state, functionToRun) => () => {
    let newState = (state + 1);
    functionToRun(newState);
    console.log(`incrementing by 1\nstate is now ${newState}`)
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" handleClick={incrementState(good, setGood)} />
      <Button text="neutral" handleClick={incrementState(neutral, setNeutral)} />
      <Button text="bad" handleClick={incrementState(bad, setBad)} />
      <Header text="statistics" />
      <StatsLine text="good" quantity={good} />
      <StatsLine text="neutral" quantity={neutral} />
      <StatsLine text="bad" quantity={bad} />
      <StatsLine text="all" quantity={good + bad + neutral} />
      <StatsLine text="average" quantity={(good * 1 + bad * (-1) + (neutral * 0)) / (good + bad + neutral) } />
      <StatsLine text="positive" quantity={`${good / (good + bad + neutral)} %`} />
    </div>
  )
}

export default App