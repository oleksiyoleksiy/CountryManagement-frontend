import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import ProductToolBar from '../ProductToolBar'
import ProductSwiper from '../ProductSwiper'
import { productService } from '../../services/productService'
import { useDispatch, useSelector } from 'react-redux'
import { productActions } from '../../store/productSlice'
import { Fire } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

function ProductDashboard() {
  const token = useSelector(state => state.auth.token)
  const currentCountry = useSelector(state => state.country.currentCountry)
  const products = useSelector(state => state.product.products)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    const response = await productService.index(currentCountry.id, token)
    dispatch(productActions.setProducts(response))
  }

  return (
    <>
      <ProductToolBar searchEnable={false} />
      <div className={styles.container}>
        {products.length > 0 && (
          <>
            <div className={styles.title}>
              <Fire className={styles.title__icon} />
              <div className={styles.title__label}>Hot New</div>
            </div>
            <Link className={styles.showMoreLink} to={'/marketplace/product'}>
              show all
            </Link>
            <div className={styles.swiperHolder}>
              <ProductSwiper />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default ProductDashboard
