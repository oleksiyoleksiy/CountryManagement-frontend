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
import { productActions } from '../../store/productSlice'
import Chat from '../../pages/Chat'
import { chatActions } from '../../store/chatSlice'
import { messageService } from '../../services/messageService'

function GameLayout() {
  const currentCountry = useSelector(state => state.country.currentCountry)
  const token = useSelector(state => state.auth.token)
  const user = useSelector(state => state.auth.user)
  const messages = useSelector(state => state.chat.messages)
  const isOnPage = useSelector(state => state.chat.isOnPage)
  const isRead = useSelector(state => state.chat.isRead)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const echo = useEcho()

  useEffect(() => {
    if (!currentCountry) {
      navigate('/select-country')
    }
  }, [token, currentCountry, navigate])

  useEffect(() => {
    if (currentCountry && token) {
      echo
        .join('general')
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
        .listen('ProductPurchaseEvent', product => {
          if (currentCountry.id === product.country.id) {
            product.deleted
              ? dispatch(productActions.deleteMyProduct(product.id))
              : dispatch(productActions.updateMyProduct(product))
          }
        })

      echo.join('chat').listen('MessageStoreEvent', message => {
        if (message.country.id !== currentCountry.id) {
          if (!messages.length) {
            fetchMessages()
          } else {
            dispatch(chatActions.addMessage(message))
          }
        }
      })

      return () => {
        echo.leaveChannel('general')
        echo.leaveChannel('chat')
      }
    }
  }, [])

  const fetchMessages = async () => {
    const response = await messageService.index(currentCountry.id, token)
    dispatch(chatActions.setMessages(response))
  }

  return (
    <div className={styles.container}>
      <InfoPanel />
      <div className={styles.content}>
        <Routes>
          <Route index element={<Building />} />
          <Route path="/building-shop" element={<BuildingShop />} />
          <Route path="/marketplace/*" element={<MarketplaceLayout />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
      <NavigationPanel />
    </div>
  )
}

export default GameLayout
