import { toast } from 'react-toastify'
import axiosInstance from '../api/axiosInstance'

export const countryBuildingService = {
  store: async (token, countryId, buildingId) => {
    try {
      const response = await axiosInstance.post(
        `/country/${countryId}/building`,
        {
          building_id: buildingId,
        },
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
  collectIncome: async (token, countryId, buildingId) => {
    try {
      const response = await axiosInstance.post(
        `/country/${countryId}/building/income`,
        {
          building_id: buildingId,
        },
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
