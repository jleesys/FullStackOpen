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
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;
  if (good == 0 && bad == 0 && neutral == 0) return (<>no feedback given</>)
  return (
    <table>
      <StatsLine text="good" quantity={good} />
      <StatsLine text="neutral" quantity={neutral} />
      <StatsLine text="bad" quantity={bad} />
      <StatsLine text="all" quantity={good + bad + neutral} />
      <StatsLine text="average" quantity={(good * 1 + bad * (-1) + (neutral * 0)) / (good + bad + neutral)} />
      <StatsLine text="positive" quantity={`${100*(good / (good + bad + neutral))} %`} />
    </table>
  )
}

const StatsLine = (props) => {
  return (
    <tr><td>{props.text}</td><td>{props.quantity}</td></tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementState = (state, functionToRun) => () => {
    let newState = (state + 1);
    functionToRun(newState);
    console.log(`incrementing by 1\nstate is now ${newState}`)
  }

  return (
    <>
      <Header text="give feedback" />
      <Button text="good" handleClick={incrementState(good, setGood)} />
      <Button text="neutral" handleClick={incrementState(neutral, setNeutral)} />
      <Button text="bad" handleClick={incrementState(bad, setBad)} />
      <Header text="statistics" />
      <StatisticsView good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App