import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../api/axiosInstance'
import { authActions } from '../store/authSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AuthUser() {
  const accessToken = useSelector(state => state.auth.token)
  const refreshToken = useSelector(state => state.auth.refreshToken)
  const [isUnauthorized, setUnauthorized] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const refresh = async () => {
    try {
      let response = await axiosInstance.post('/refresh', null, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      })

      dispatch(authActions.setToken(response.data))
    } catch (error) {
      navigate('/login')
      console.log(error)
    }
  }

  const fetchUser = async () => {
    try {
      let response = await axiosInstance.get('/user/current', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      dispatch(authActions.setUser(response.data))
    } catch (error) {
      setUnauthorized(true)
      console.log(error)
    }
  }

  useEffect(() => {
    if (isUnauthorized && refreshToken) {
      refresh()
    }

    if (!refreshToken) {
      navigate('/login')
    }
  }, [isUnauthorized])

  useEffect(() => {
    if (accessToken) {
      fetchUser()
    }
  }, [accessToken])
}

export default AuthUser
