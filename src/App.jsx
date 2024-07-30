import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthUser from './components/AuthUser'
import SelectCountry from './pages/SelectCountry'
import CreateCountry from './pages/CreateCountry'
import GameLayout from './layouts/GameLayout'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <AuthUser />
      <Routes>
        <Route path="/*" element={<GameLayout />} />
        <Route path="/select-country" element={<SelectCountry />} />
        <Route path="/create-country" element={<CreateCountry />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  )
}

export default App
