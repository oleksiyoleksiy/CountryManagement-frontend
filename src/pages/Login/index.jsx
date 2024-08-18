import React, { useRef, useState } from 'react'
import styles from './index.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/authSlice'
import { authService } from '../../services/authService'
import { toast } from 'react-toastify'
import useLanguage from '../../hooks/useLanguage'

function Login() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const lang = useLanguage()

  const handleLogin = async e => {
    e.preventDefault()

    try {
      let response = await authService.login({ email, password })
      dispatch(authActions.setToken(response))
      navigate('/select-country')
    } catch (error) {
      console.log(error.response)
      toast(error.response.data.message)

      if (error.response.data) {
        let errors = error.response.data.errors

        setErrors({
          email: errors.email,
          password: errors.password,
        })
      }
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.holder}>
        <div className={styles.placeholder}>
          <div className={styles.placeholder__text}>
            {lang.login.placeholder.text}
          </div>
          <Link to={'/register'} className={styles.placeholder__button}>
            {lang.login.placeholder.link}
          </Link>
        </div>
        <div className={styles.formHolder}>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={e => handleLogin(e)}>
              <h1 className={styles.form__title}>{lang.login.title}</h1>
              <div className={styles.form__group}>
                <div className={styles.form__inputGroup}>
                  <input
                    required
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                    placeholder=""
                    className={styles.form__input}
                  />
                  <label className={styles.form__label}>
                    {lang.login.form.inputs.email}
                  </label>
                </div>
                {errors.email && (
                  <ul className={styles.form__errorList}>
                    {errors.email.map((item, index) => (
                      <li key={index} className={styles.form__error}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={styles.form__group}>
                <div className={styles.form__inputGroup}>
                  <input
                    required
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    placeholder=""
                    className={styles.form__input}
                  />
                  <label className={styles.form__label}>
                    {lang.login.form.inputs.password}
                  </label>
                </div>
                {errors.password && (
                  <ul className={styles.form__errorList}>
                    {errors.password.map((item, index) => (
                      <li key={index} className={styles.form__error}>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={styles.form__buttonContainer}>
                <div className={styles.form__buttonHolder}>
                  <button className={styles.form__button}>
                    {lang.login.form.submitButton}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
