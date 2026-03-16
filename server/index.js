import express from 'express';
import {createServer} from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { handleConnection } from './socketHandler.js';

const app = express();
const httpServer = createServer(app);


const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Más real que '*'
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => handleConnection(socket, io));

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});