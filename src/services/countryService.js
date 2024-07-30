import { toast } from 'react-toastify'
import axiosInstance from '../api/axiosInstance'

export const countryIndex = async token => {
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
}

export const countryStore = async (token, data) => {
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
}

export const countryBuildingStore = async (token, countryId, buildingId) => {
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
}

export const countryDelete = async (countryId, token) => {
  try {
    await axiosInstance.delete(`/country/${countryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    toast(error.response.data.message)
  }
}

export const countryBuildingCollectIncome = async (
  token,
  countryId,
  buildingId
) => {
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
}
