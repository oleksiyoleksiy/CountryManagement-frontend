import React from 'react'
import styles from './index.module.scss'
import { NavLink } from 'react-router-dom'
import './index.scss'
import {
  ArrowLeftSquareFill,
  ArrowRepeat,
  BasketFill,
  BoxArrowLeft,
  BuildingFill,
  BuildingFillAdd,
  CartFill,
  HousesFill,
  List,
  ShopWindow,
} from 'react-bootstrap-icons'

function NavigationPanel() {
  return (
    <nav className={styles.navbar}>
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
