import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { X, XLg } from 'react-bootstrap-icons'
import { productService } from '../../services/productService'
import { productActions } from '../../store/productSlice'
import { countryActions } from '../../store/countrySlice'

function EditProduct() {
  const { id } = useParams()
  const myProducts = useSelector(state => state.product.myProducts)
  const currentCountry = useSelector(state => state.country.currentCountry)
  const token = useSelector(state => state.auth.token)
  const [errors, setErrors] = useState({
    count: null,
    price: null,
  })
  const [product, setProduct] = useState(null)
  const [count, setCount] = useState(null)
  const [price, setPrice] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const redirectIfNoProduct = () => {
    if (!myProducts.some(item => item.id == id)) {
      navigate('/marketplace/my-product')
    }
  }

  const handleFormSubmit = async e => {
    e.preventDefault()

    try {
      const data = {
        count: count,
        price: price,
      }
      const response = await productService.update(
        currentCountry.id,
        product.id,
        data,
        token
      )
      
      console.log(response);
      dispatch(productActions.updateMyProduct(response.product))
      dispatch(countryActions.setCurrentCountry(response.country))
      navigate('/marketplace/my-product')
    } catch (error) {
      
      if (error.response.data) {
        let errors = error.response.data.errors

        setErrors({
          count: errors.count,
          price: errors.price,
        })
      }
    }
  }

  useEffect(() => {
    redirectIfNoProduct()
    const product = myProducts.filter(item => item.id == id)[0]
    setProduct(product)
    setCount(product.count)
    setPrice(product.price)
  }, [])

  return (
    product && (
      <div className={styles.container}>
        <div className={styles.holder}>
          <div className={styles.closeButton}>
            <Link to={-1} className={styles.closeButton__button}>
              <XLg className={styles.closeButton__icon} />
            </Link>
          </div>
          <div className={styles.content}>
            <div className={styles.imageHolder}>
              <img
                className={styles.image}
                src={product.image}
                alt="product-image"
              />
            </div>
            <form onSubmit={e => handleFormSubmit(e)} className={styles.form}>
              <div className={styles.form__title}>Editing product</div>
              <div className={styles.form__content}>
                <div className={styles.form__group}>
                  <label className={styles.form__label}>count</label>
                  <input
                    className={styles.form__input}
                    min={1}
                    onChange={e => setCount(e.target.value)}
                    value={count}
                    type="number"
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
                <div className={styles.form__group}>
                  <label className={styles.form__label}>price</label>
                  <input
                    className={styles.form__input}
                    onChange={e => setPrice(e.target.value)}
                    min={1000}
                    value={price}
                    type="number"
                  />
                  {errors.price && (
                    <ul className={styles.form__errorList}>
                      {errors.price.map((item, index) => (
                        <li key={index} className={styles.form__error}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className={styles.form__buttonHolder}>
                <button type="submit" className={styles.form__button}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  )
}

export default EditProduct
