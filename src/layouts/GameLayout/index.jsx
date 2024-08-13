import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Building from '../../components/Building'
import BuildingShop from '../../components/BuildingShop'
import InfoPanel from '../../components/InfoPanel'
import NavigationPanel from '../../components/NavigationPanel'
import MarketplaceLayout from '../MarketplaceLayout'
import styles from './index.module.scss'
import useEcho from '../../hooks/useEcho'
import axiosInstance from '../../api/axiosInstance'
import { productActions } from '../../store/productSlice'

function GameLayout() {
  const currentCountry = useSelector(state => state.country.currentCountry)
  const token = useSelector(state => state.auth.token)
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const echo = useEcho()

  const redirectIfNoAuthOrCountry = () => {
    if (!token) {
      navigate('/login')
    } else if (!currentCountry) {
      navigate('/select-country')
    }
  }

  useEffect(() => {
    if (currentCountry) {
      echo
        .join(`general`)
        .here(members => {
          console.log('Members currently in the channel:', members)
        })
        .joining(member => {
          console.log('New member joined:', member)
        })
        .leaving(member => {
          console.log('Member left:', member)
        })
        .listen('ProductStoreEvent', product => {
          if (currentCountry.id !== product.country.id) {
            dispatch(productActions.addProduct(product))
          }
        })
        .listen('ProductDeleteEvent', product => {
          if (currentCountry.id !== product.country.id) {
            dispatch(productActions.deleteProduct(product.id))
          }
        })
        .listen('ProductUpdateEvent', product => {
          if (currentCountry.id !== product.country.id) {
            dispatch(productActions.updateProduct(product))
          }
        })

      return () => {
        echo.leave()
      }
    }
  }, [user])

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
