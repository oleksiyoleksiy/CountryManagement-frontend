import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  useNavigate,
} from 'react-router-dom'

let globalNavigate = null

export const setNavigate = navigateFn => {
  globalNavigate = navigateFn
}

export const getNavigate = () => {
  return globalNavigate
}
