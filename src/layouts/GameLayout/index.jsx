import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import Building from '../../components/Building'
import BuildingShop from '../../components/BuildingShop'
import { BuildingFill, BuildingFillAdd } from 'react-bootstrap-icons'
import InfoPanel from '../../components/InfoPanel'
import NavigationPanel from '../../components/NavigationPanel'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function GameLayout() {
  const currentCountry = useSelector(state => state.country.currentCountry)
  const navigate = useNavigate()

  const redirectIfNoCountry = () => {
    if (!currentCountry) {
      navigate('/select-country')
    }
  }

  useEffect(() => {
    redirectIfNoCountry()
  }, [])

  return (
    <div className={styles.container}>
      <InfoPanel />
      <div className={styles.content}>
        <Routes>
          <Route index element={<Building />} />
          <Route path="/building-shop" element={<BuildingShop />} />
        </Routes>
      </div>
      <NavigationPanel />
    </div>
  )
}

export default GameLayout
