import { useMemo, useState } from 'react'
import { Board } from './components/Board'
import { useGame } from './hooks/useGame'
import { useLobby } from './hooks/useLobby'

function App() {
  const [roomId, setRoomId] = useState('')
  const { connected, playerSymbol, board, currentTurn, gameOver, canPlay, makeMove } =
    useGame(roomId)
  const { rooms } = useLobby()

  const lobbyRooms = useMemo(() => {
    const baseRooms = ['1', '2', '3', '4', '5'].map((id) => ({
      id,
      playerCount: 0,
      status: 'Vacia',
    }))

    const updatesById = new Map(
      rooms.map((room) => [
        String(room.id),
        {
          id: String(room.id),
          playerCount: Number(room.playerCount) || 0,
          status: room.status || (room.playerCount > 0 ? 'Esperando' : 'Vacia'),
        },
      ]),
    )

    return baseRooms.map((room) => updatesById.get(room.id) ?? room)
  }, [rooms])

  

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      {!roomId ? (
        <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
          <h1 className="mb-4 text-2xl font-bold text-slate-800">Tateti Online</h1>
          <p className="mb-4 text-slate-600">Elegí una sala para unirte:</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {lobbyRooms.map((room) => (
              <button
                key={room.id}
                type="button"
                onClick={() => setRoomId(room.id)}
                className="rounded-lg bg-indigo-600 px-4 py-3 text-left font-semibold text-white transition hover:bg-indigo-700"
              >
                <p className="text-base">Sala {room.id}</p>
                <p className="text-xs text-indigo-100">
                  <span className="inline-flex items-center gap-1">
                    <span aria-hidden="true">👤</span>
                    <span>{`${room.playerCount}/2`}</span>
                  </span>
                  {' - '}
                  {room.status}
                </p>
              </button>
            ))}
          </div>
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

          <div className="relative">
            <Board board={board} onCellClick={makeMove} disabled={!canPlay} />
            {gameOver && (
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-slate-950/85 backdrop-blur-[2px]">
                <div className="rounded-xl border border-yellow-300/70 bg-gradient-to-br from-yellow-200 to-amber-300 px-6 py-4 text-center shadow-[0_0_35px_rgba(251,191,36,0.65)]">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-900">
                    Fin del juego
                  </p>
                  <p className="mt-1 text-3xl font-black text-amber-950">
                    {gameOver.winner ? `Ganador: ${gameOver.winner}` : 'Empate'}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-amber-900">
                    {gameOver.message}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  )
}

export default App
