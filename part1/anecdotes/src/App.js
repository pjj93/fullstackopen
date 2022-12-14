import { useState } from 'react'

const Anecdote = ({anecdote, points}) => {
  return (
    <>
      <div>{anecdote}</div>
      <div>has {points} votes</div> 
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
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [maxVoted, setMaxVoted] = useState(0)

  // console.log("points", points)

  const addVote = () => {
    const copy = [...points]
    copy[selected]++
    setPoints(copy)

    if (copy[selected] > copy[maxVoted]) {
      setMaxVoted(selected)
    }
  }

  const changeAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <Anecdote anecdote={anecdotes[selected]} points={points[selected]} />
        {/* <div>{anecdotes[selected]}</div>
        <div>has {points[selected]} votes</div> */}
        <button onClick={addVote}>vote</button>
        <button onClick={changeAnecdote}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with the most votes</h1>
        {Math.max(...points) !==0 && <Anecdote anecdote={anecdotes[maxVoted]} points={points[maxVoted]} />}
        {/* <Anecdote anecdote={anecdotes[maxVoted]} points={points[maxVoted]} /> */}
        {/* <div>{anecdotes[maxVoted]}</div>
        <div>has {points[maxVoted]} votes</div> */}
      </div>
    </>
  )
}

export default App