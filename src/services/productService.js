import { toast } from 'react-toastify'
import axiosInstance from '../api/axiosInstance'

export const productService = {
  index: async (countryId, token) => {
    try {
      const response = await axiosInstance.get(
        `/country/${countryId}/product`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return response.data
    } catch (error) {
      toast(error.response.data.message)
    }
  },

  myProductIndex: async (countryId, token) => {
    try {
      const response = await axiosInstance.get(
        `/country/${countryId}/country-product`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return response.data
    } catch (error) {
      toast(error.response.data.message)
    }
  },
  update: async (countryId, productId, data, token) => {
    const response = await axiosInstance.put(
      `/country/${countryId}/product/${productId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  },
  show: async (countryId, productId, token) => {
    try {
      const response = await axiosInstance.get(
        `/country/${countryId}/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return response.data
    } catch (error) {
      toast(error.response.data.message)
    }
  },

  store: async (countryId, token, data) => {
    const response = await axiosInstance.post(
      `/country/${countryId}/product`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  },

  purchase: async (countryId, productId, data, token) => {
    const response = await axiosInstance
      .post(`/country/${countryId}/product/${productId}/purchase`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch(error => toast(error.response.data.message))

    return response.data
  },

  destroy: async (countryId, productId, token) => {
    try {
      const response = await axiosInstance.delete(
        `/country/${countryId}/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (error) {
      toast(error.response.data.message)
    }
  },
}
