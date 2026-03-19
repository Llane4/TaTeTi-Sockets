import { useEffect, useMemo, useRef, useState } from 'react'
import { io } from 'socket.io-client'

const SERVER_URL = 'http://localhost:3000'

export function useGame(roomId) {
  const socketRef = useRef(null)
  const [playerSymbol, setPlayerSymbol] = useState(null)
  const [board, setBoard] = useState(Array(9).fill(null))
  const [currentTurn, setCurrentTurn] = useState('X')
  const [gameOver, setGameOver] = useState(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    if (!roomId) return undefined

    const socket = io(SERVER_URL, { transports: ['websocket'] })
    socketRef.current = socket

    socket.on('connect', () => {
      setConnected(true)
      socket.emit('join_game', roomId)
    })

    socket.on('disconnect', () => {
      setConnected(false)
    })

    socket.on('player_symbol', ({ symbol }) => {
      setPlayerSymbol(symbol)
    })

    socket.on('update_board', ({ board: nextBoard, currentTurn: nextTurn }) => {
      setBoard(nextBoard)
      setCurrentTurn(nextTurn)
    })

    socket.on('game_over', (payload) => {
      setGameOver(payload)
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [roomId])

  const canPlay = useMemo(() => {
    return Boolean(playerSymbol) && playerSymbol === currentTurn && !gameOver
  }, [playerSymbol, currentTurn, gameOver])

  const makeMove = (position) => {
    if (!socketRef.current || !roomId || !canPlay) return
    if (board[position] !== null) return
    socketRef.current.emit('make_move', roomId, position)
  }

  return {
    connected,
    playerSymbol,
    board,
    currentTurn,
    gameOver,
    canPlay,
    makeMove,
  }
}
