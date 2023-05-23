import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const App = () => {
  const queryClient = useQueryClient()
  const voteAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    voteAnecdoteMutation.mutate(votedAnecdote)
  }

  const result = useQuery('anecdotes', getAnecdotes)
  
  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return (
      <div>
        anecdote service is not available due to problems in server
      </div>
    )
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
