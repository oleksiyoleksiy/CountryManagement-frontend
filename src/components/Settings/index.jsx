import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { availableLanguages } from '../../hooks/useLanguage'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/authSlice'
import useLanguage from '../../hooks/useLanguage'
import { XLg } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import Select from '../Select'

function Settings() {
  const languages = availableLanguages
  const dispatch = useDispatch()
  const lang = useLanguage()
  const language = useSelector(state => state.auth.language)
  const [selected, setSelected] = useState(null)

  const changeLanguage = language => {
    dispatch(authActions.setLanguage(language.value))
    setSelected(language)
  }

  useEffect(() => {
    const selectedLanguage = languages.find(item => item.value === language)
    setSelected(selectedLanguage)
  }, [language, languages])

  return (
    language &&
    selected && (
      <div className={styles.container}>
        <div className={styles.holder}>
          <Link to={'/select-country'} className={styles.closeButton}>
            <XLg className={styles.closeButton__icon} />
          </Link>
          <div className={styles.title}>{lang.settings.title}</div>
          <form className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                {lang.settings.form.inputs.language}
              </label>
              <Select
                availableOptions={languages.map(item => ({
                  label: item.label,
                  value: item.value,
                }))}
                selected={{ label: selected.label, value: selected.value }}
                onChange={option =>
                  changeLanguage(
                    languages.find(item => item.value === option.value)
                  )
                }
              />
            </div>
          </form>
        </div>
      </div>
    )
  )
}

export default Settings
