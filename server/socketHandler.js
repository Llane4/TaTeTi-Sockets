import { rooms } from './gameInfo.js';

export const handleConnection = (socket, io) => {
    console.log('Usuario conectado:', socket.id);

    //Cuando un usuario se une a una sala
    socket.on('join_game', (gameId) => {

        if (!gameId) return;
        socket.join(gameId);
        if (!rooms[gameId]) {
            rooms[gameId] = {
                players: [],
                board: Array(9).fill(null),
                currentTurn: 'X',
            }
        }
        const room = rooms[gameId];

        if(room.players.length < 2) {
            const symbol = room.players.length === 0 ? 'X' : 'O';
            room.players.push({id: socket.id, symbol: symbol});
            socket.join(gameId);
            socket.emit("player_symbol", {symbol: symbol});
        } else {
            socket.emit('game_full', { message: 'La sala está llena' });
            return;
        }

        console.log(`Usuario ${socket.id} se unio a la saal ${gameId}`);
    });
    
    //Cuando un usuario hace un movimiento
    socket.on('make_move', (gameId, position) =>{
        if (!gameId || position === undefined) return;

        const room = rooms[gameId];
        if (!room) return;

        const player = room.players.find(player => player.id === socket.id);
        if (!player) return;
        if(player.symbol !== room.currentTurn) return;

        if(room.board[position] !== null) return;
        room.board[position] = player.symbol;
        room.currentTurn = player.symbol === 'X' ? 'O' : 'X';

        io.to(gameId).emit('update_board', 
            {
                board: room.board, 
                currentTurn: room.currentTurn
            });

        //Falta agregar la logica para verificar si hay un ganador o si es un empate
    })

    //Cuando un usuario se desconecta
    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
}