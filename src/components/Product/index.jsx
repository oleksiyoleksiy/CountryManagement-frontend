import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { productService } from '../../services/productService'
import { productActions } from '../../store/productSlice'
import { Link, Route, Routes } from 'react-router-dom'
import PurchaseProduct from '../PurchaseProduct'
import ProductToolBar from '../ProductToolBar'

function Product() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const products = useSelector(state => state.product.products)
  const [filteredProducts, setFilteredProducts] = useState([])
  const currentCountry = useSelector(state => state.country.currentCountry)

  useEffect(() => {
    fetchProduct()
  }, [currentCountry])

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  const fetchProduct = async () => {
    const response = await productService.index(currentCountry.id, token)
    dispatch(productActions.setProducts(response))
  }

  const filter = value => {
    setFilteredProducts(
      products.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    )
  }

  return (
    <>
      <ProductToolBar onSearch={e => filter(e)} />
      <div className={styles.container}>
        {filteredProducts.length > 0 &&
          filteredProducts.map((product, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.card__name}>{product.name}</div>
              <div className={styles.card__count}>x{product.count}</div>
              <div className={styles.card__imageHolder}>
                <img
                  className={styles.card__image}
                  src={product.image}
                  alt="fossil-img"
                />
              </div>

              <div className={styles.seller}>
                sold by{' '}
                <span className={styles.seller__value}>{product.seller}</span>
              </div>
              <Link
                className={styles.card__button}
                to={`/marketplace/purchase/${product.id}`}
              >
                <div className={styles.price}>
                  <div className={styles.price__content}>
                    <img
                      className={styles.price__icon}
                      src="/money.webp"
                      alt="money-icon"
                    />
                    <div className={styles.price__value}>{product.price}</div>
                  </div>
                  <div className={styles.price__label}>per unit</div>
                </div>
              </Link>
            </div>
          ))}
      </div>
      <Routes></Routes>
    </>
  )
}

export default Product
