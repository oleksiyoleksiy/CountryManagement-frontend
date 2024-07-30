import React, { useState } from 'react'
import styles from './index.module.scss'

function Modal({ onApply, message, applyButtonText = 'ok', onCancel }) {
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
          <button onClick={handleApply} className={styles.buttonApply}>
            {applyButtonText}
          </button>
          <button onClick={handleCancel} className={styles.buttonCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
