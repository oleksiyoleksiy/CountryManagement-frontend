import { createSlice } from '@reduxjs/toolkit'

const countrySlice = createSlice({
  name: 'country',
  initialState: {
    countries: [],
    currentCountry: null,
    buildings: [],
    timers: {},
  },
  reducers: {
    setTimers(state, action) {
      state.timers = action.payload
    },
    setCountries(state, action) {
      state.countries = action.payload ?? []
    },
    deleteCountry(state, action) {
      state.countries = state.countries.filter(
        item => item.country.id !== action.payload
      )
    },
    setBuildings(state, action) {
      state.buildings = action.payload
    },
    setCurrentCountry(state, action) {
      state.currentCountry = action.payload
    },
    addCountry(state, action) {
      state.countries.push(action.payload)
    },
    addBuilding(state, action) {
      state.buildings.push(action.payload)
    },
  },
})

export const countryActions = countrySlice.actions

export default countrySlice
