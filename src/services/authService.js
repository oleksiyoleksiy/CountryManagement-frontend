import { toast } from 'react-toastify'
import axiosInstance from '../api/axiosInstance'

export const authService = {
  login: async data => {
    const response = await axiosInstance.post('/login', data)
    return response.data
  },

  register: async data => {
    const response = await axiosInstance.post('/register', data)
    return response.data
  },

  refresh: async token => {
    const response = await axiosInstance.post('/refresh', null, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  },

  currentUser: async token => {
    const response = await axiosInstance.get('/user/current', null, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  },
}
