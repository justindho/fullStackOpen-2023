import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setCreatedAnecdoteMessage, removeMessage } from '../reducers/messageReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setCreatedAnecdoteMessage(content))
    setTimeout(() => dispatch(removeMessage()), 5000)
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={create}>
        <input name='anecdote'/>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm