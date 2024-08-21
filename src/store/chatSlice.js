import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    // isRead: true,
    // isOnPage: false,
  },
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload
    },
    addMessage(state, action) {
      state.messages.push(action.payload)
      console.log(state.messages)
      
    },
    // setReadStatus(state, action) {
    //   state.isRead = action.payload
    // },
    // setOnPageStatus(state, action) {
    //   state.isOnPage = action.payload
    // },
  },
})

export const chatActions = chatSlice.actions

export default chatSlice
