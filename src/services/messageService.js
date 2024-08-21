import { toast } from 'react-toastify'
import axiosInstance from '../api/axiosInstance'

export const messageService = {
  index: async (countryId, token) => {
    try {
      const response = await axiosInstance.get(
        `/country/${countryId}/message`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return response.data
    } catch (error) {
      console.error('Error fetching countries:', error)
      throw error
    }
  },

  store: async (countryId, token, data) => {
    try {
      const response = await axiosInstance.post(
        `/country/${countryId}/message`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (error) {
      toast.error(error.response.message)
    }
  },
}
