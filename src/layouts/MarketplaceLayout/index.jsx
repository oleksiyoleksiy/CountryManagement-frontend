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
import Product from '../../components/Product'
import MyProduct from '../../components/MyProduct'
import ProductToolBar from '../../components/ProductToolBar'
import CreateProduct from '../../pages/CreateProduct'
import PurchaseProduct from '../../components/PurchaseProduct'
import ProductDashboard from '../../components/ProductDashboard'

function MarketplaceLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Routes>
          <Route index element={<ProductDashboard />} />
          <Route path="/purchase/:id" element={<PurchaseProduct />} />
          <Route path="/product" element={<Product />} />
          <Route path="/my-product/*" element={<MyProduct />} />
          <Route path="/create-product" element={<CreateProduct />} />
        </Routes>
      </div>
    </div>
  )
}

export default MarketplaceLayout
