import React from 'react'
import styles from './index.module.scss'
import ChatInput from '../../components/ChatInput'
import MessageContainer from '../../components/MessageContainer'

function Chat() {
  return (
    <div className={styles.container}>
      <MessageContainer />
      <ChatInput />
    </div>
  )
}

export default Chat
