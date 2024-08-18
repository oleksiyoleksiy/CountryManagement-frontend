import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'

function Select({ availableOptions, selected, onChange }) {
  const [value, setValue] = useState(selected.label)
  const [isOpened, setOpened] = useState(false)
  const [options, setOptions] = useState([])

  const handleOptionClick = option => {
    setValue(option.label)
    onChange(option)
    setOpened(false)
  }

  useEffect(() => {
    setValue(selected.label)
    setOptions(availableOptions.filter(item => item.value !== selected.value))
  }, [availableOptions, selected])

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.selectButton}
        onClick={() => setOpened(!isOpened)}
      >
        {value}
      </button>
      <div
        className={`${styles.optionPanel} ${
          isOpened ? styles.optionPanel_opened : styles.optionPanel_closed
        }`}
      >
        {options.map((item, index) => (
          <div
            key={index}
            className={styles.option}
            onClick={() => handleOptionClick(item)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Select
