import React, { useState } from 'react'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { countryActions } from '../../store/countrySlice'
import { Link, useNavigate } from 'react-router-dom'
import { productService } from '../../services/productService'
import {
  ArrowLeft,
  ArrowLeftSquare,
  ArrowLeftSquareFill,
  ArrowReturnLeft,
  Check,
} from 'react-bootstrap-icons'
import { productActions } from '../../store/productSlice'
import { toast } from 'react-toastify'
import useLanguage from '../../hooks/useLanguage'

function CreateProduct() {
  const [type, setType] = useState(1)
  const [fossil, setFossil] = useState(null)
  const [count, setCount] = useState(null)
  const [price, setPrice] = useState(null)
  const fossils = ['uranium', 'oil', 'copper', 'iron', 'coal']
  const types = [{ label: 'fossil', value: 1 }]
  const [errors, setErrors] = useState({
    type: null,
    count: null,
    fossil: null,
    price: null,
    fee: null,
  })
  const token = useSelector(state => state.auth.token)
  const currentCountry = useSelector(state => state.country.currentCountry)
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const lang = useLanguage()

  const createProduct = async e => {
    e.preventDefault()
    try {
      const response = await productService.store(currentCountry.id, token, {
        type: type,
        count: count,
        fossil: fossil,
        price: price,
      })

      dispatch(productActions.addMyProduct(response.product))
      dispatch(countryActions.setCurrentCountry(response.country))
      navigate('/marketplace/my-product')
    } catch (error) {
      if (error.response.data) {
        let errors = error.response.data.errors

        setErrors({
          type: errors.type,
          count: errors.count,
          fossil: errors.fossil,
          price: errors.price,
          fee: errors.fee,
        })
      }
    }
  }

  const handleCheckboxClick = () => {
    setAgree(!isAgreed)
  }

  return (
    currentCountry && (
      <div className={styles.container}>
        <div className={styles.holder}>
          <div className={styles.backButtonHolder}>
            <Link to={-1} className={styles.backButton}>
              <ArrowLeft className={styles.backButtonIcon} />
            </Link>
          </div>
          <form onSubmit={e => createProduct(e)} className={styles.form}>
            <div className={styles.form__title}>{lang.createProduct.title}</div>
            <div className={styles.form__group}>
              <div className={styles.form__inputGroup}>
                <label className={styles.form__label}>
                  {lang.createProduct.form.inputs.type}
                </label>
                <div className={styles.types}>
                  {types.map((item, index) => (
                    <div
                      key={index}
                      className={`${styles.type} ${
                        type === item.value ? styles.type_selected : ''
                      }`}
                    >
                      <div className={styles.type__label}>{item.label}</div>
                      <input
                        required
                        checked={type === item.value}
                        value={item.value}
                        name="type"
                        type="radio"
                        onChange={e => setType(e.target.value)}
                        className={styles.type__radio}
                      />
                    </div>
                  ))}
                  {errors.type && (
                    <ul className={styles.form__errorList}>
                      {errors.type.map((item, index) => (
                        <li key={index} className={styles.form__error}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              {type === 1 && (
                <div className={styles.form__inputGroup}>
                  <label className={styles.form__label}>
                    {lang.createProduct.form.inputs.fossil}
                  </label>
                  <div className={styles.fossils}>
                    {fossils.map((item, index) => (
                      <div
                        key={index}
                        disabled={currentCountry.resources[item] === 0}
                        className={`${styles.fossil} ${
                          fossil === item ? styles.fossil_selected : ''
                        }`}
                      >
                        <img
                          className={styles.fossil__image}
                          src={`/${item}.webp`}
                          alt="resource"
                        />
                        <input
                          required
                          value={item}
                          name="fossil"
                          type="radio"
                          onChange={e => setFossil(e.target.value)}
                          className={styles.fossil__radio}
                        />
                      </div>
                    ))}
                  </div>
                  {errors.fossil && (
                    <ul className={styles.form__errorList}>
                      {errors.fossil.map((item, index) => (
                        <li key={index} className={styles.form__error}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {fossil && (
                <>
                  <div className={styles.form__inputGroup}>
                    <label className={styles.form__label}>
                      {lang.createProduct.form.inputs.count}
                    </label>
                    <input
                      required
                      name="type"
                      type="number"
                      min={1}
                      max={currentCountry.resources[fossil]}
                      onChange={e => setCount(e.target.value)}
                      className={styles.form__input}
                    />
                    {errors.count && (
                      <ul className={styles.form__errorList}>
                        {errors.count.map((item, index) => (
                          <li key={index} className={styles.form__error}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className={styles.form__inputGroup}>
                    <label className={styles.form__label}>
                      {lang.createProduct.form.inputs.price}
                    </label>
                    <input
                      required
                      name="type"
                      type="number"
                      min={1000}
                      onChange={e => setPrice(e.target.value)}
                      className={styles.form__input}
                    />
                  </div>
                  {errors.price && (
                    <ul className={styles.form__errorList}>
                      {errors.price.map((item, index) => (
                        <li key={index} className={styles.form__error}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
            <div className={styles.form__buttonContainer}>
              <div className={styles.form__buttonHolder}>
                <button
                  disabled={currentCountry.resources['money'] < 1000 || !fossil}
                  type="submit"
                  className={styles.button}
                >
                  <img
                    src="/money.webp"
                    alt="money-icon"
                    className={styles.button__icon}
                  />
                  <div className={styles.button__value}>1000</div>
                </button>
              </div>
              {errors.fee && (
                <ul className={styles.form__errorList}>
                  {errors.fee.map((item, index) => (
                    <li key={index} className={styles.form__error}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </form>
        </div>
      </div>
    )
  )
}

export default CreateProduct
