import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    myProducts: [],
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload ?? []
    },
    addProduct(state, action) {
      state.products.push(action.payload)
    },
    updateProduct(state, action) {
      const product = action.payload
      state.products = state.products.map(item =>
        item.id === product.id ? product : item
      )
    },
    deleteProduct(state, action) {
      state.products = state.products.filter(item => item.id !== action.payload)
    },
    setMyProducts(state, action) {
      state.myProducts = action.payload ?? []
    },
    addMyProduct(state, action) {
      state.myProducts.push(action.payload)
    },
    updateMyProduct(state, action) {
      const product = action.payload
      state.myProducts = state.myProducts.map(item =>
        item.id === product.id ? product : item
      )
    },
    deleteMyProduct(state, action) {
      state.myProducts = state.myProducts.filter(
        item => item.id !== action.payload
      )
    },
    clearMyProducts(state) {
      state.myProducts = []
    },
    clearProducts(state) {
      state.products = []
    },
  },
})

export const productActions = productSlice.actions

export default productSlice
