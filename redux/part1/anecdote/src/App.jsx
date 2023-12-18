import { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return (
    <div>
      <button onClick={() => handleClick()}>
        {text}
      </button>
    </div>
  )
}

const Header = ({ text }) => {
  return (
    <>
      <h2>{text}</h2>
    </>
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
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  //  const votes = new Uint8Array(anecdotes.length);
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));
  const randomInt = function () {
    const lengthAnecdotes = anecdotes.length;
    return Math.floor(Math.random() * (lengthAnecdotes));
  }

  const getHighestVoted = () => {
    let highest = 0;
    for (let i = 0; i <= votes.length; i++) {
      if (votes[i] > votes[highest]) {
        highest = i;
      }
    }
    console.log(highest);
    return highest;
  }
  return (
    <div>
      <Header text={'Anecdote of the Day'} />
      {anecdotes[selected]}
      <Button text={'Next Anecdote'} handleClick={() => setSelected(randomInt())} />
      <Button text={'Vote'} handleClick={() => {
        const newVotes = [...votes]
        newVotes[selected] = newVotes[selected] + 1;
        setVotes(newVotes);
      }
      } />
      <Header text={'Top Anecdote'} />
      <div>
        {votes}
      </div>
      {anecdotes[getHighestVoted()]}

    </div>
  )
}

export default App
