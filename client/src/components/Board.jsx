function Cell({ value, onClick, disabled }) {
  const symbolColor =
    value === 'X' ? 'text-sky-500 drop-shadow-[0_0_10px_rgba(14,165,233,0.45)]' : ''
  const altSymbolColor =
    value === 'O' ? 'text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.45)]' : ''

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`h-28 w-28 rounded-2xl border border-slate-700/40 bg-slate-900/85 text-6xl font-extrabold tracking-tight text-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-400/70 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-80 ${symbolColor} ${altSymbolColor}`}
    >
      {value}
    </button>
  )
}

export function Board({ board, onCellClick, disabled }) {
  return (
    <div className="grid grid-cols-3 gap-3 rounded-2xl bg-slate-950 p-4 ring-1 ring-slate-800">
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          disabled={disabled || cell !== null}
        />
      ))}
    </div>
  )
}
