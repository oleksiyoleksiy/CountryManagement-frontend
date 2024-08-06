import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Building from '../../components/Building'
import BuildingShop from '../../components/BuildingShop'
import InfoPanel from '../../components/InfoPanel'
import NavigationPanel from '../../components/NavigationPanel'
import MarketplaceLayout from '../MarketplaceLayout'
import styles from './index.module.scss'

function GameLayout() {
  const currentCountry = useSelector(state => state.country.currentCountry)
  const token = useSelector(state => state.auth.token)
  const navigate = useNavigate()

  const redirectIfNoAuthOrCountry = () => {
    if (!token) {
      navigate('/login')
    } else if (!currentCountry) {
      navigate('/select-country')
    }
  }

  useEffect(() => {
    redirectIfNoAuthOrCountry()
  }, [token, currentCountry])

  return (
    <div className={styles.container}>
      <InfoPanel />
      <div className={styles.content}>
        <Routes>
          <Route index element={<Building />} />
          <Route path="/building-shop" element={<BuildingShop />} />
          <Route path="/marketplace/*" element={<MarketplaceLayout />} />
        </Routes>
      </div>
      <NavigationPanel />
    </div>
  )
}

export default GameLayout
