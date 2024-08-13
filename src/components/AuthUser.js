import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { authActions } from '../store/authSlice'

function AuthUser() {
  const navigate = useNavigate()
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()

  // const redirectIfNoToken = () => {
  //   const storedAccessToken = localStorage.getItem('accessToken')
  //   const storedRefreshToken = localStorage.getItem('refreshToken')
  //   if (!storedAccessToken || !storedRefreshToken || !token) {
  //     navigate('/login')
  //   }
  // }

  const fetchUser = async () => {
    const response = await authService.currentUser(token)
    dispatch(authActions.setUser(response))    
  }

  // useEffect(() => {
  //   redirectIfNoToken()
  // }, [])


  useEffect(() => {
    if (token) {
      fetchUser()
    }
  }, [token])

  return null // Since this component only handles authentication logic
}

export default AuthUser
