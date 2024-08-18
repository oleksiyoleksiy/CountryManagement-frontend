import './App.scss'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthUser from './components/AuthUser'
import SelectCountry from './pages/SelectCountry'
import CreateCountry from './pages/CreateCountry'
import GameLayout from './layouts/GameLayout'
import { ToastContainer } from 'react-toastify'
import { setNavigate } from './navigate'
import { useEffect } from 'react'
import useEcho from './hooks/useEcho'
import { setEcho } from './echo'
import useLanguage from './hooks/useLanguage'
import { useDispatch } from 'react-redux'
import { authActions } from './store/authSlice'

function App() {
  const navigate = useNavigate()
  const echo = useEcho()
  const lang = useLanguage() // Use the custom hook to get the language data

  useEffect(() => {
    setNavigate(navigate)
    setEcho(echo)
  }, [navigate, echo])

  return (
    <>
      <AuthUser />
      <Routes>
        <Route path="/*" element={<GameLayout />} />
        <Route path="/select-country/*" element={<SelectCountry />} />
        <Route path="/create-country" element={<CreateCountry />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  )
}

export default App
