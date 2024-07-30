import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import buildingSlice from './buildingSlice'
import countrySlice from './countrySlice'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    building: buildingSlice.reducer,
    country: countrySlice.reducer,
  },
})

export default store
