import React, { useState } from 'react'
import styles from './index.module.scss'
import {
  Check2Circle,
  CheckCircleFill,
  XCircleFill,
} from 'react-bootstrap-icons'

function Modal({ onApply, message, onCancel }) {
  const [isVisible, setVisibility] = useState(true)

  const handleCancel = () => {
    setVisibility(false)
    onCancel()
  }

  const handleApply = () => {
    onApply()
    setVisibility(false)
  }

  return (
    <div
      className={`${styles.placeholder} ${
        isVisible ? styles.modal_visible : styles.modal_invisible
      }`}
    >
      <div className={styles.container}>
        <div className={styles.message}>{message}</div>
        <div className={styles.buttonHolder}>
          <button
            onClick={handleCancel}
            className={`${styles.button} ${styles.buttonCancel}`}
          >
            <XCircleFill />
          </button>
          <button
            onClick={handleApply}
            className={`${styles.button} ${styles.buttonApply}`}
          >
            <CheckCircleFill />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
