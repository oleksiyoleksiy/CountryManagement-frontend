import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authService } from '../../services/authService'
import { authActions } from '../../store/authSlice'
import useLanguage from '../../hooks/useLanguage'

function Register() {
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [passwordConfirmation, setPasswordConfirmation] = useState(null)
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
  })

  const lang = useLanguage()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = async e => {
    e.preventDefault()

    try {
      const userData = {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      }

      let response = await authService.register(userData)

      dispatch(authActions.setToken(response))

      navigate('/select-country')
    } catch (error) {
      if (error.response.data) {
        let errors = error.response.data.errors

        setErrors({
          name: errors.name,
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
            {lang.register.placeholder.text}
          </div>
          <Link to={'/login'} className={styles.placeholder__buttonContainer}>
            <div className={styles.placeholder__button}>
              {lang.register.placeholder.link}
            </div>
          </Link>
        </div>
        <div className={styles.formHolder}>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={e => handleRegister(e)}>
              <h1 className={styles.form__title}>{lang.register.title}</h1>
              <div className={styles.form__group}>
                <div className={styles.form__inputGroup}>
                  <input
                    required
                    type="text"
                    onChange={e => setName(e.target.value)}
                    placeholder=""
                    className={styles.form__input}
                  />
                  <label className={styles.form__label}>
                    {lang.register.form.inputs.name}
                  </label>
                </div>
                {errors.name && (
                  <ul className={styles.form__errorList}>
                    {errors.name.map(item => (
                      <li className={styles.form__error}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
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
                    {lang.register.form.inputs.email}
                  </label>
                </div>
                {errors.email && (
                  <ul className={styles.form__errorList}>
                    {errors.email.map(item => (
                      <li className={styles.form__error}>{item}</li>
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
                    {lang.register.form.inputs.password}
                  </label>
                </div>
                {errors.password && (
                  <ul className={styles.form__errorList}>
                    {errors.password.map(item => (
                      <li className={styles.form__error}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={styles.form__group}>
                <div className={styles.form__inputGroup}>
                  <input
                    required
                    type="password"
                    onChange={e => setPasswordConfirmation(e.target.value)}
                    placeholder=""
                    className={styles.form__input}
                  />
                  <label className={styles.form__label}>
                    {lang.register.form.inputs.passwordConfirmation}
                  </label>
                </div>
              </div>
              <div className={styles.form__buttonContainer}>
                <div className={styles.form__buttonHolder}>
                  <button className={styles.form__button}>
                    {lang.register.form.submitButton}
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

export default Register
