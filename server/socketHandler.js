export const handleConnection = (socket, io) => {
    console.log('Usuario conectado:', socket.id);
    socket.on('join_game', (gameId) => {
        socket.join(gameId);
        console.log(`Usuario ${socket.id} se unio a la saal ${gameId}`);
    });
    
    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
}