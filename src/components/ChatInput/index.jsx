import React, { useState } from 'react'
import styles from './index.module.scss'
import { SendFill } from 'react-bootstrap-icons'
import { messageService } from '../../services/messageService'
import { useDispatch, useSelector } from 'react-redux'
import { chatActions } from '../../store/chatSlice'

function ChatInput() {
  const [content, setContent] = useState('')
  const [cooldown, setCooldown] = useState(0)
  const currentCountry = useSelector(state => state.country.currentCountry)
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const delay = 10

  const countdown = () => {
    setCooldown(delay)

    const interval = setInterval(() => {
      setCooldown(prevCooldown => {
        if (prevCooldown <= 1) {
          clearInterval(interval)
          return 0
        }
        return prevCooldown - 1
      })
    }, 1000)
  }

  const getProgressBarStyle = () => {
    const percentage = ((delay - cooldown) / delay) * 100
    return {
      width: `${percentage}%`,
    }
  }

  const handleSendButtonClick = async () => {
    const data = {
      content: content,
    }

    const response = await messageService.store(currentCountry.id, token, data)

    dispatch(chatActions.addMessage(response))
    setContent('')
    countdown()
  }

  return (
    <div className={styles.container}>
      <div className={styles.holder}>
        <input
          type="text"
          value={content}
          onChange={e => setContent(e.target.value)}
          className={styles.input}
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendButtonClick}
          disabled={!content || cooldown !== 0}
          className={styles.sendButton}
        >
          {cooldown !== 0 && (
            <div className={styles.progressBar} style={getProgressBarStyle()} />
          )}
          <SendFill className={styles.sendIcon} />
        </button>
      </div>
    </div>
  )
}

export default ChatInput
