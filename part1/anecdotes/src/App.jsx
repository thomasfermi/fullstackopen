import { useState } from 'react'

const randomNumber = max => Math.floor(Math.random() * max)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anectode = ({anectode, num_votes}) => {
  return (
      <div>
        <p>{anectode}</p> 
        <p>{"has " + String(num_votes) + " votes"}</p>
      </div>
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
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint32Array(anecdotes.length))

  const randomizeSelection = () => {
      setSelected(randomNumber(anecdotes.length))
  }

  const addVote = () => {
    let copied_votes = [...votes]
    copied_votes[selected]+=1
    setVotes(copied_votes)
  }

  var indexOfMaxVotes = votes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);

  return (
    <div>
      <h1>Anectode of the day</h1>
      <Anectode anectode={anecdotes[selected]} num_votes={votes[selected]} />
      <Button handleClick={randomizeSelection} text={"next anecdote"} />
      <Button handleClick={addVote} text={"vote"} />
      <h1>Anectode with most votes</h1>
      <Anectode anectode={anecdotes[indexOfMaxVotes]} num_votes={votes[indexOfMaxVotes]} />
    </div>
  )
}

export default App