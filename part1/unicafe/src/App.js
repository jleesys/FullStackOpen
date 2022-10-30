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

const StatisticsView = (props) => {
  return (
    <p>{props.text} {props.quantity}</p>
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

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" handleClick={incrementGood()} />
      <Button text="neutral" handleClick={incrementNeutral()} />
      <Button text="bad" handleClick={incrementBad()} />
      <Header text="statistics" />
      <StatisticsView text="good" quantity={good} />
      <StatisticsView text="neutral" quantity={neutral} />
      <StatisticsView text="bad" quantity={bad} />
    </div>
  )
}

export default App