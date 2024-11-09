require('dotenv/config');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require("socket.io");
const app = require('./app');
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const redis = require('redis');

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const redisClient = redis.createClient({
    // url: 'redis://redis:6379',
    legacyMode: true
});

let activeRooms = [];
let roomMessages = {};

(async () => {
    await redisClient.connect();
    console.log('Redis connected');

    redisClient.on('error', (err) => {
        console.log('Redis error:', err);
    });
})();

io.on('connection', (socket) => {
    console.log('Connected to socket:', socket.id);

    socket.on('getActiveRooms', () => {
        // console.log('romMessages:', roomMessages);
        socket.emit('activeRooms', roomMessages);
    });

    socket.on('getOldRoomMessages', (room) => {
        // console.log('Getting old room messages for room:', room);
        socket.emit('oldRoomMessages', roomMessages[room] || []);
    });

    socket.on('joinRoom', (room) => {
        socket.join(room);
        if (!activeRooms.includes(room)) {
            activeRooms.push(room);
            redisClient.set('activeRooms', JSON.stringify(activeRooms));
        }
        // console.log(`Socket ${socket.id} joined room ${room}`);
        // console.log("roomMessages:", roomMessages);
        socket.emit('previousMessages', { [room]: roomMessages[room] || [] });
        // io.emit('activeRooms', roomMessages);
    });

    socket.on('newMessageUser', (data, callback) => {
        // console.log('Received newMessageUser:', data.message, 'in room:', data.room);
        // console.log('callback', callback);
        if (callback && typeof callback === 'function') {
            callback();
        }
        if (!roomMessages[data.room]) {
            roomMessages[data.room] = [];
        }
        roomMessages[data.room].push({
            type: 'user',
            message: data.message,
            name: data.name,
            phoneNumber: data.phoneNumber
        });
        redisClient.set('roomMessages', JSON.stringify(roomMessages));
        redisClient.get('roomMessages', (err, data) => {
            if (err) {
                console.log('Error getting roomMessages from redis:', err);
            } else {
                console.log('???', JSON.parse(data));
            }
        });
        // console.log("roomMessages:", roomMessages);

        io.emit('activeRooms', roomMessages);
        io.to(data.room).emit('newMessageUser', {
            message: data.message,
            room: data.room,
            name: data.name,
            phoneNumber: data.phoneNumber
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
        io.emit('activeRooms', roomMessages);
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
