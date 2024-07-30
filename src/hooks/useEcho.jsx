import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

const useEcho = () => {
  const { token } = useSelector(state => state.auth)

  const echoInstance = useMemo(() => {
    return new Echo({
      broadcaster: import.meta.env.VITE_BROADCASTER,
      key: import.meta.env.VITE_REVERB_APP_KEY,
      authEndpoint: import.meta.env.VITE_AUTH_ENDPOINT,
      forceTLS: true,
      auth: {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    })
  }, [token])

  useEffect(() => {
    return () => {
      echoInstance.disconnect()
    }
  }, [echoInstance])

  return echoInstance
}

export default useEcho
