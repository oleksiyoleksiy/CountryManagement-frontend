import axiosInstance from '../api/axiosInstance'

export const buildingService = {
  index: async token => {
    try {
      const response = await axiosInstance.get('/building', {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
}
