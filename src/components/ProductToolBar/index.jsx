import React from 'react'
import styles from './index.module.scss'
import './index.scss'
import { Link, NavLink } from 'react-router-dom'
import {
  CaretDownFill,
  CaretDownSquareFill,
  GlobeEuropeAfrica,
  GridFill,
  PersonCircle,
  PlusSquareFill,
} from 'react-bootstrap-icons'
import useLanguage from '../../hooks/useLanguage'



function ProductToolBar({ onSearch, searchEnable = true }) {
    const lang = useLanguage()
  
  return (
    <div className={styles.container}>
      <div className={styles.holder}>
        <div className={styles.list}>
          <Link className={styles.list__link} to="/marketplace/create-product">
            <PlusSquareFill className={styles.link__icon} />
          </Link>
          {searchEnable && (
            <input
              onChange={e => onSearch(e.target.value)}
              className={styles.list__input}
              placeholder={lang.toolbar.filter}
              type="text"
            />
          )}
          <NavLink
            active="true"
            className={`${styles.list__link} ${styles.myProductLink}`}
            to="/marketplace/my-product"
          >
            <GridFill className={styles.link__icon} />
            <GlobeEuropeAfrica className={styles.link__countryIcon} />
          </NavLink>
          <NavLink
            active="true"
            className={styles.list__link}
            to="/marketplace/product"
          >
            <GridFill className={styles.link__icon} />
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default ProductToolBar
