import React from 'react'
import styles from './index.module.scss'
import { Link, NavLink } from 'react-router-dom'
import './index.scss'
import {
  ArrowLeftSquareFill,
  ArrowRepeat,
  BasketFill,
  BoxArrowLeft,
  BuildingFill,
  BuildingFillAdd,
  CartFill,
  GlobeEuropeAfrica,
  HousesFill,
  List,
  ShopWindow,
} from 'react-bootstrap-icons'

function NavigationPanel() {
  return (
    <nav className={styles.navbar}>
      <Link className={`${styles.navbar__link} ${styles.selectCountriesLink}`} to="/select-country">
        <GlobeEuropeAfrica className={styles.navbar__icon} />
      </Link>
      <NavLink active="true" className={styles.navbar__link} to="/">
        <BuildingFill className={styles.navbar__icon} />
      </NavLink>
      <NavLink
        active="true"
        className={styles.navbar__link}
        to="/building-shop"
      >
        <BuildingFillAdd className={styles.navbar__icon} />
      </NavLink>
      <NavLink active="true" className={styles.navbar__link} to="/marketplace">
        <BasketFill className={styles.navbar__icon} />
      </NavLink>
    </nav>
  )
}

export default NavigationPanel
