import axios from 'axios'
import store from '../store'
import { authActions } from '../store/authSlice'
import { authService } from '../services/authService'
import { useNavigate } from 'react-router-dom'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN,
  headers: {
    Accept: 'application/json',
  },
})

const getAccessToken = () => store.getState().auth.token
const getRefreshToken = () => store.getState().auth.refreshToken

// Запобігання циклічним запитам
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// Request interceptor to add access token to headers
axiosInstance.interceptors.request.use(
  config => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return axiosInstance(originalRequest)
          })
          .catch(err => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken = getRefreshToken()
      if (!refreshToken) {
        store.dispatch(authActions.logout())
        useNavigate('/login')
        return Promise.reject(error)
      }

      try {
        const response = await authService.refresh(refreshToken)
        
        store.dispatch(authActions.setToken(response))

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.accessToken}`
        originalRequest.headers.Authorization = `Bearer ${response.accessToken}`

        processQueue(null, response.accessToken)

        return axiosInstance(originalRequest)

      } catch (refreshError) {
        processQueue(refreshError, null)
        store.dispatch(authActions.logout())
        useNavigate('/login')
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    } else if (error.response?.status === 401) {
      store.dispatch(authActions.logout())
      useNavigate('/login')
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
