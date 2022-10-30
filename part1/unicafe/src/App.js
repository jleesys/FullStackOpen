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
      <>
      <StatsLine text="good" quantity={props.good} />
      <StatsLine text="neutral" quantity={props.neutral} />
      <StatsLine text="bad" quantity={props.bad} />
      <StatsLine text="all" quantity={props.good + props.bad + props.neutral} />
      <StatsLine text="average" quantity={(props.good * 1 + props.bad * (-1) + (props.neutral * 0)) / (props.good + props.bad + props.neutral) } />
      <StatsLine text="positive" quantity={`${props.good / (props.good + props.bad + props.neutral)} %`} />
      </>
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

  /*
  const incrementGood = () => () => {
    setGood(good + 1);
  }

  const incrementNeutral = () => () => {
    setNeutral(neutral + 1);
  }

  const incrementBad = () => () => {
    setBad(bad + 1);
  }
  */

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
      <StatisticsView good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App