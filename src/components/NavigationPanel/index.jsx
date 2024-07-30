import React from 'react'
import styles from './index.module.scss'
import { NavLink } from 'react-router-dom'
import { ArrowLeftSquareFill, ArrowRepeat, BoxArrowLeft, BuildingFill, BuildingFillAdd, HousesFill, List } from 'react-bootstrap-icons'

function NavigationPanel() {
  return (
    <nav className={styles.navbar}>
      <NavLink className={styles.navbar__link} to="/">
        <BuildingFill className={styles.navbar__icon} />
      </NavLink>
      <NavLink className={styles.navbar__link} to="/building-shop">
        <BuildingFillAdd className={styles.navbar__icon} />
      </NavLink>
    </nav>
  )
}

export default NavigationPanel
