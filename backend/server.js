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
        console.log("roomMessages:", roomMessages);
        socket.emit('previousMessages', { [room]: roomMessages[room] || [] });
        // io.emit('activeRooms', getActiveRoomsSocket(io));
    });

    socket.on('newMessageUser', (data, callback) => {
        console.log('Received newMessageUser:', data.message, 'in room:', data.room);
        console.log('callback', callback);
        if (callback && typeof callback === 'function') {
            callback();
        }
        if (!roomMessages[data.room]) {
            roomMessages[data.room] = [];
        }
        roomMessages[data.room].push({
            type: 'user',
            message: data.message,
            name: data.name
        });
        console.log("roomMessages:", roomMessages);

        io.emit('activeRooms', getActiveRoomsSocket(io));
        io.to(data.room).emit('newMessageUser', {
            message: data.message,
            room: data.room,
            name: data.name
        });
    });

    socket.on('newMessageAdmin', (data, callback) => {
        console.log('Received newMessageAdmin:', data.message, 'in room:', data.room);
        if (callback && typeof callback === 'function') {
            callback();
        }
        if (!roomMessages[data.room]) {
            roomMessages[data.room] = [];
        }
        roomMessages[data.room].push({
            type: 'admin',
            message: data.message,
            name: data.name
        });
        io.to(data.room).emit('newMessageAdmin', {
            message: data.message,
            room: data.room
        });
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
