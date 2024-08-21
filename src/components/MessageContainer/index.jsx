import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { messageService } from '../../services/messageService'
import { chatActions } from '../../store/chatSlice'

function MessageContainer() {
  const messages = useSelector(state => state.chat.messages)
  const token = useSelector(state => state.auth.token)
  const currentCountry = useSelector(state => state.country.currentCountry)
  const dispatch = useDispatch()
  const containerRef = useRef(null)

  useEffect(() => {
    if (!messages.length) fetchMessages()

    // dispatch(chatActions.setOnPageStatus(true))

    // return () => {
    //   dispatch(chatActions.setOnPageStatus(false))
    // }
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  const fetchMessages = async () => {
    const response = await messageService.index(currentCountry.id, token)
    dispatch(chatActions.setMessages(response))
  }

  return (
    <div className={styles.container}>
      <div className={styles.holder} ref={containerRef}>
        {messages.map((item, index) => (
          <div key={index} className={styles.message}>
            <div className={styles.message__countryName}>
              {item.country.name}
            </div>
            <div className={styles.message__content}>{item.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MessageContainer
