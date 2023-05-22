import { useSelector, useDispatch } from 'react-redux'
import { create, voteFor } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote)
    dispatch(voteFor(anecdote))
  }

  const createAnecdote = (event) => {
    event.preventDefault()
    console.log('create anecdote')
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(create(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <input name='anecdote'/>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App