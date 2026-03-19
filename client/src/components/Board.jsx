function Cell({ value, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="h-24 w-24 rounded-lg border border-slate-300 bg-white text-3xl font-bold text-slate-800 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {value}
    </button>
  )
}

export function Board({ board, onCellClick, disabled }) {
  return (
    <div className="grid grid-cols-3 gap-2">
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
