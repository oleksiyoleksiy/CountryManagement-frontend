import { toast } from 'react-toastify'
import axiosInstance from '../api/axiosInstance'

export const countryService = {
  index: async token => {
    try {
      const response = await axiosInstance.get('/country', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    } catch (error) {
      console.error('Error fetching countries:', error)
      throw error
    }
  },

  store: async (token, data) => {
    try {
      const response = await axiosInstance.post('/country', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error storing country:', error)
      throw error
    }
  },

  destroy: async (countryId, token) => {
    try {
      await axiosInstance.delete(`/country/${countryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      toast(error.response.data.message)
    }
  },
}
