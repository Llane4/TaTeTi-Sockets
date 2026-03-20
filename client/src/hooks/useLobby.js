import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

const SERVER_URL = 'http://localhost:3000'

export function useLobby() {
  const [rooms, setRooms] = useState([])
  const socketRef = useRef(null)

  useEffect(() => {
    const socket = io(SERVER_URL, { transports: ['websocket'] })
    socketRef.current = socket

    socket.on('rooms_update', (data) => {
      setRooms(Array.isArray(data) ? data : [])
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [])

  return { rooms }
}