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
  if (props.good == 0 && props.bad == 0 && props.neutral == 0) return (<>no feedback given</>)
  return (
    <>
      <StatsLine text="good"quantity={props.good}/>
      <StatsLine text="neutral"quantity={props.neutral}/>
      <StatsLine text="bad"quantity={props.bad}/>
      <StatsLine text="all"quantity={props.good + props.bad + props.neutral}/>
      <StatsLine text="average"quantity={(props.good * 1 + props.bad * (-1) + (props.neutral * 0)) / (props.good + props.bad + props.neutral)}/>
      <StatsLine text="positive"quantity={`${props.good / (props.good + props.bad + props.neutral)} %`}/>
    </>
  )
}

const StatsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.quantity}</td>
    </tr>
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
      <table>
        <StatisticsView good={good}neutral={neutral}bad={bad}/>
      </table>
    </>
  )
}

export default App