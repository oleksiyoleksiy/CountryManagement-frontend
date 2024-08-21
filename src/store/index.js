import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import buildingSlice from './buildingSlice'
import countrySlice from './countrySlice'
import productSlice from './productSlice'
import chatSlice from './chatSlice'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    building: buildingSlice.reducer,
    country: countrySlice.reducer,
    product: productSlice.reducer,
    chat: chatSlice.reducer,
  },
})

export default store
