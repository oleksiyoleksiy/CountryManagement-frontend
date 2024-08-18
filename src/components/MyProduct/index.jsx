import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import ProductToolBar from '../ProductToolBar'
import { productService } from '../../services/productService'
import { productActions } from '../../store/productSlice'
import { PencilFill, Trash2Fill, TrashFill } from 'react-bootstrap-icons'
import { countryActions } from '../../store/countrySlice'
import { Link, Route, Routes } from 'react-router-dom'
import EditProduct from '../EditProduct'
import useLanguage from '../../hooks/useLanguage'

function MyProduct() {
  const myProducts = useSelector(state => state.product.myProducts)
  const currentCountry = useSelector(state => state.country.currentCountry)
  const token = useSelector(state => state.auth.token)
  const [filteredProducts, setFilteredProducts] = useState([])
  const dispatch = useDispatch()
  const lang = useLanguage()

  useEffect(() => {
    if (currentCountry) {
      fetchMyProduct()
    }
  }, [currentCountry])

  useEffect(() => {
    setFilteredProducts(myProducts)
  }, [myProducts])

  const fetchMyProduct = async () => {
    const response = await productService.myProductIndex(
      currentCountry.id,
      token
    )
    dispatch(productActions.setMyProducts(response))
    setFilteredProducts(response)
  }

  const filter = value => {
    setFilteredProducts(
      myProducts.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    )
  }

  const handleDeleteClick = async item => {
    const response = await productService.destroy(
      currentCountry.id,
      item.id,
      token
    )
    dispatch(countryActions.setCurrentCountry(response))
    dispatch(productActions.deleteMyProduct(item.id))
  }

  return (
    <>
      <ProductToolBar onSearch={e => filter(e)} />
      <div className={styles.container}>
        {filteredProducts.length > 0 &&
          filteredProducts.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.card__name}>{item.name}</div>
              <div className={styles.card__count}>x{item.count}</div>
              <div className={styles.card__imageHolder}>
                <img
                  className={styles.card__image}
                  src={item.image}
                  alt="product-name"
                />
              </div>
              <div className={styles.price}>
                <div className={styles.price__content}>
                  <img
                    className={styles.price__icon}
                    src="/money.webp"
                    alt="money-icon"
                  />
                  <div className={styles.price__value}>{item.price}</div>
                </div>
                <div className={styles.price__label}>
                  {lang.general.perUnit}
                </div>
              </div>
              <div className={styles.card__buttonHolder}>
                <Link
                  to={`/marketplace/my-product/edit/${item.id}`}
                  className={`${styles.card__button} ${styles.editButton}`}
                >
                  <PencilFill className={styles.card__buttonIcon} />
                </Link>
                <button
                  onClick={() => handleDeleteClick(item)}
                  className={`${styles.card__button} ${styles.deleteButton}`}
                >
                  <TrashFill className={styles.card__buttonIcon} />
                </button>
              </div>
            </div>
          ))}
      </div>
      <Routes>
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </>
  )
}

export default MyProduct
