import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'message',
  initialState: '',
  reducers: {
    setCreatedAnecdoteMessage(state, action) {
      return `You created a new anecdote: '${action.payload}'`
    },
    setVotedMessage(state, action) {
      return `You voted for '${action.payload}'`
    },
    removeMessage(state, action) {
      return ''
    }
  }
})

export const { setCreatedAnecdoteMessage, setVotedMessage, removeMessage } = messageSlice.actions

export const setCreatedAnecdoteNotification = (anecdote, seconds) => {
  return async dispatch => {
    dispatch(setCreatedAnecdoteMessage(anecdote))
    setTimeout(() => dispatch(removeMessage()), seconds * 1000)
  }
}

export const setVotedAnecdoteNotification = (anecdote, seconds) => {
  return async dispatch => {
    dispatch(setVotedMessage(anecdote.content))
    setTimeout(() => dispatch(removeMessage()), seconds * 1000)
  }
}

export default messageSlice.reducer