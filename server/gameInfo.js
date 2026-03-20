export const rooms = {};

export const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

export const verificarGanador = (board) => {
    for(const combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;
        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

export const getInfoRooms = ()=>{
    return Object.keys(rooms).map(id => ({
        id,
        playerCount: rooms[id].players.length,
        status: rooms[id].players.length === 2 ? "Llena" : "Esperando"
    }))
}