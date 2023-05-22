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
export default messageSlice.reducer