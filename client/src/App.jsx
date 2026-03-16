import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import './App.css'

function App() {
  
  const [connected, setConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState(null)

  useEffect(() => {
    const socket = io('http://localhost:3000', {
      transports: ['websocket'],
    })

    socket.on('connect', () => {
      setConnected(true)
    })

    socket.on('mensaje', (data) => {
      setLastMessage(data)
    })

    socket.emit('mensaje', { texto: 'Hola desde el front' })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <>
      <section id="center">
        
        <div>
          <h1>Conexión con Socket.io</h1>
          <p>
            Estado conexión: <strong>{connected ? 'Conectado' : 'Desconectado'}</strong>
          </p>
          <p>
            Último mensaje:{' '}
            <strong>
              {lastMessage ? JSON.stringify(lastMessage) : 'Sin mensajes aún'}
            </strong>
          </p>
        </div>
        
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
