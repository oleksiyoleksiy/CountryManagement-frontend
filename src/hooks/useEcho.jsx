import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

const useEcho = () => {
  const { token } = useSelector(state => state.auth)

  const echoInstance = useMemo(() => {
    return new Echo({
      broadcaster: 'reverb',
      key: import.meta.env.VITE_REVERB_APP_KEY,
      wsHost: import.meta.env.VITE_REVERB_HOST,
      wsPort: import.meta.env.VITE_REVERB_PORT,
      wssPort: import.meta.env.VITE_REVERB_PORT,
      forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
      authEndpoint: import.meta.env.VITE_AUTH_ENDPOINT,
      enabledTransports: ['ws', 'wss'],
      auth: {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
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
