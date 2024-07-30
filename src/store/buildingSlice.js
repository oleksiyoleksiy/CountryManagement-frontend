import { createSlice } from '@reduxjs/toolkit'

const buildingSlice = createSlice({
  name: 'building',
  initialState: {
    buildings: [],
  },
  reducers: {
    setBuildings(state, action) {
      state.buildings = action.payload
    },
  },
})

export const buildingActions = buildingSlice.actions

export default buildingSlice
