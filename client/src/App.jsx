import { useState } from 'react'
import { Board } from './components/Board'
import { useGame } from './hooks/useGame'

function App() {
  const [roomInput, setRoomInput] = useState('')
  const [roomId, setRoomId] = useState('')
  const { connected, playerSymbol, board, currentTurn, gameOver, canPlay, makeMove } =
    useGame(roomId)

  const joinRoom = (event) => {
    event.preventDefault()
    const trimmed = roomInput.trim()
    if (!trimmed) return
    setRoomId(trimmed)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      {!roomId ? (
        <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
          <h1 className="mb-4 text-2xl font-bold text-slate-800">Tateti Online</h1>
          <p className="mb-4 text-slate-600">Ingresá un Room ID para empezar.</p>
          <form onSubmit={joinRoom} className="space-y-3">
            <input
              type="text"
              value={roomInput}
              onChange={(event) => setRoomInput(event.target.value)}
              placeholder="Ej: sala-123"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-3 py-2 font-semibold text-white hover:bg-indigo-700"
            >
              Unirme a la sala
            </button>
          </form>
        </section>
      ) : (
        <section className="rounded-2xl bg-white p-6 shadow">
          <h1 className="mb-2 text-2xl font-bold text-slate-800">Sala: {roomId}</h1>
          <p className="mb-1 text-slate-600">
            Estado: {connected ? 'Conectado' : 'Desconectado'}
          </p>
          <p className="mb-1 text-slate-600">
            Tu símbolo: <strong>{playerSymbol || 'Asignando...'}</strong>
          </p>
          <p className="mb-4 text-slate-600">
            Turno actual: <strong>{currentTurn}</strong>
          </p>

          <Board board={board} onCellClick={makeMove} disabled={!canPlay} />

          {gameOver && (
            <p className="mt-4 text-center font-semibold text-emerald-700">
              {gameOver.message}
            </p>
          )}
        </section>
      )}
    </main>
  )
}

export default App
