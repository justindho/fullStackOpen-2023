import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setVotedAnecdoteNotification } from '../reducers/messageReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => 
    state.anecdotes.filter(a => a.content.startsWith(state.filter))
  )

  const voteFor = (anecdote) => {
    dispatch(voteForAnecdote(anecdote))
    dispatch(setVotedAnecdoteNotification(anecdote, 2))
  }

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voteFor(anecdote)}>vote</button>
            </div>
          </div>
      )}
    </div>
  )
}

export default AnecdoteList