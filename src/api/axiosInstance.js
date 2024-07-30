import axios from 'axios'
import store from '../store' // adjust the import path as needed
import { authActions } from '../store/authSlice'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN,
  headers: {
    Accept: 'application/json',
  },
})

// // Function to get the current access token from the Redux store
// const getAccessToken = () => store.getState().auth.token
// const getRefreshToken = () => store.getState().auth.refreshToken

// // Request interceptor to add access token to headers
// axiosInstance.interceptors.request.use(
//   config => {
//     const token = getAccessToken()
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

// axiosInstance.interceptors.response.use(
//   response => {
//     return response
//   },
//   async error => {
//     const originalRequest = error.config

//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true
//       try {
//         const refreshToken = getRefreshToken()
//         if (!refreshToken) {
//           store.dispatch(authActions.logout())
//           return Promise.reject(error)
//         }

//         const response = await axios.post('/refresh', null, {
//           baseURL: import.meta.env.VITE_API_DOMAIN,
//           headers: { Authorization: `Bearer ${refreshToken}` },
//         })

//         store.dispatch(authActions.setToken(response.data))
//         originalRequest.headers.Authorization = `Bearer ${response.data.token}`

//         return axiosInstance(originalRequest)
//       } catch (refreshError) {
//         store.dispatch(authActions.logout())
//         return Promise.reject(refreshError)
//       }
//     }

//     return Promise.reject(error)
//   }
// )

export default axiosInstance