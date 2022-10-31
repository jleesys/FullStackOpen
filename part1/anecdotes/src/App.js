import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * (max));
  }
  window.getRandomInt = getRandomInt;

  const [selected, setSelected] = useState(0)

  const setRandomState = () => () => {
    setSelected(getRandomInt(anecdotes.length));
    console.log(`state now randomized`);
  }

  const updateVote = () => () => {
    const newPointsArray =  points.map((value, i) => {
      if (selected == i) { return value + 1; }
      else { return value; }
    })

    setPoints(newPointsArray);
    console.log(`updated vote count for anecdote # ${selected}`)
    console.log(points)
  }

  const [points,setPoints] = useState(new Uint8Array(anecdotes.length));
  window.points = points;

  const findHighestVoted = () => {
    let highestVotedIndex = 0;
    for (let i = 0 ; i < points.length ; i++) {
      if (points[highestVotedIndex] < points[i]) highestVotedIndex = i;
    }
    return highestVotedIndex;
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <div>has {points[selected]} votes.</div>
      <Button text="vote" onClick={updateVote()}></Button>
      <Button text="next anecdote" onClick={setRandomState()}></Button>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[findHighestVoted()]}</p>
      <div>has {points[findHighestVoted()]} votes.</div>
    </div>
  )
}

export default App