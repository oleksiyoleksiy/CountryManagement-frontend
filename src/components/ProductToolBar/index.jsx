import React from 'react'
import styles from './index.module.scss'
import './index.scss'
import { Link, NavLink } from 'react-router-dom'

function ProductToolBar({ onSearch, searchEnable = true }) {
  return (
    <div className={styles.container}>
      <div className={styles.holder}>
        <div className={styles.list}>
          <Link className={styles.list__link} to="/marketplace/create-product">
            Create
          </Link>
          {searchEnable && (
            <input
              onChange={e => onSearch(e.target.value)}
              className={styles.list__input}
              placeholder="search"
              type="text"
            />
          )}
          <NavLink
            active="true"
            className={styles.list__link}
            to="/marketplace/my-product"
          >
            My product
          </NavLink>
          <NavLink
            active="true"
            className={styles.list__link}
            to="/marketplace/product"
          >
            Product
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default ProductToolBar
