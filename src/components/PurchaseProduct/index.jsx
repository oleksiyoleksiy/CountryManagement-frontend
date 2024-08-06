import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { productService } from '../../services/productService'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowLeft } from 'react-bootstrap-icons'
import { productActions } from '../../store/productSlice'
import { countryActions } from '../../store/countrySlice'
import { toast } from 'react-toastify'

function PurchaseProduct() {
  const { id } = useParams()
  const currentCountry = useSelector(state => state.country.currentCountry)
  const token = useSelector(state => state.auth.token)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const products = useSelector(state => state.product.products)
  const [product, setProduct] = useState(null)
  const [count, setCount] = useState(1)

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    const product = products.filter(item => item.id == id)[0]
    setProduct(product)
  }

  const handleCountChange = e => {
    let value = parseInt(e.target.value, 10)

    if (value < 1 || e.target.value.length === 0) {
      value = 1
    } else if (value > product.count) {
      value = product.count
    }

    setCount(value)
  }

  const handleFormSubmit = async e => {
    e.preventDefault()

    const data = {
      count: count,
    }

    const response = await productService.purchase(
      currentCountry.id,
      product.id,
      data,
      token
    )
    if (response.product) {
      dispatch(productActions.updateProduct(response.product))
    }else {
      dispatch(productActions.deleteProduct(product.id))
    }
    dispatch(countryActions.setCurrentCountry(response.country))
    toast.info(
      `${count} units of a ${product.name} are purchased`
    )
    navigate(-1)
  }

  return (
    product && (
      <div className={styles.container}>
        <div className={styles.holder}>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            <ArrowLeft className={styles.backButton__icon} />
          </button>
          <div className={styles.content}>
            <img
              className={styles.image}
              src={product.image}
              alt="product-image"
            />
            <form onSubmit={e => handleFormSubmit(e)} className={styles.form}>
              <div className={styles.form__title}>{product.name}</div>
              <div className={styles.seller}>
                sold by{' '}
                <span className={styles.seller__name}>{product.seller}</span>
              </div>
              <div className={styles.form__content}>
                <div className={styles.form__group}>
                  <label className={styles.form__label}>count</label>
                  <input
                    className={styles.form__input}
                    type="number"
                    onChange={handleCountChange}
                    value={count}
                    min={1}
                    max={product.count}
                  />
                  <input
                    type="range"
                    min={1}
                    max={product.count}
                    value={count}
                    onChange={handleCountChange}
                  />
                </div>
                <div className={styles.total}>
                  <div className={styles.total__label}>total</div>
                  <div className={styles.total__content}>
                    <img className={styles.total__icon} src="/money.webp" />
                    <div className={styles.total__value}>
                      {count * product.price}
                    </div>
                  </div>
                </div>
              </div>
              <button className={styles.form__button}>Buy</button>
            </form>
          </div>
        </div>
      </div>
    )
  )
}

export default PurchaseProduct
