require('dotenv/config');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require("socket.io");
const app = require('./app');
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const { getActiveRoomsSocket } = require('./src/utils/helper.util');

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const activeRooms = [];
const roomMessages = {};

io.on('connection', (socket) => {
    console.log('Connected to socket:', socket.id);

    socket.on('getActiveRooms', () => {
        socket.emit('activeRooms', getActiveRoomsSocket(io));
    });

    socket.on('joinRoom', (room) => {
        socket.join(room);
        if (!activeRooms.includes(room)) {
            activeRooms.push(room);
        }
        console.log(`Socket ${socket.id} joined room ${room}`);
        socket.emit('previousMessages', roomMessages[room] || []);
        io.emit('activeRooms', getActiveRoomsSocket(io));
    });

    socket.on('newMessageUser', (data, room, callback) => {
        console.log('Received newMessageUser:', data, 'in room:', room);
        if (callback && typeof callback === 'function') {
            callback('Message received successfully');
        }
        if (!roomMessages[room]) {
            roomMessages[room] = [];
        }
        roomMessages[room].push({ type: 'user', message: data });
        socket.join(room);
        io.to(room).emit('newMessageUser', { message: data, room });
        io.emit('activeRooms', getActiveRoomsSocket(io)); // Emit updated active rooms
    });

    socket.on('newMessageAdmin', (data, room, callback) => {
        console.log('Received newMessageAdmin:', data, 'in room:', room);
        if (callback && typeof callback === 'function') {
            callback('Message received successfully');
        }
        if (!roomMessages[room]) {
            roomMessages[room] = [];
        }
        roomMessages[room].push({ type: 'admin', message: data });
        io.to(room).emit('newMessageAdmin', { message: data, room });
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from socket:', socket.id);
    });
});


mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log('Connected to database');
        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log("Error connecting to database: ", err);
    });
