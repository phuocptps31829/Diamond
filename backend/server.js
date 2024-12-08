require('dotenv/config');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require("socket.io");
const getRedisClient = require('./src/config/redisClient');

const app = require('./app');
const { callRoutes, delCaches } = require('./src/utils/init-cache');
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Socket initialization
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let activeRooms = [];
let roomMessages = {};

(async () => {
    const redisClient = await getRedisClient();

    // Socket connection
    io.on('connection', async (socket) => {
        console.log('Connected to socket');

        socket.on('laravel_database_Notifications', (data) => {
            console.log('data:', data);
        });

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
            if (callback && typeof callback === 'function') {
                callback();
            }
            console.log('data:', data.room, roomMessages);
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
            console.log('Disconnected from socket');
        });
    });

    // Listen for new notifications
    const subscriber = await redisClient.duplicate();
    await subscriber.connect();
    subscriber.v4.subscribe('laravel_database_Notifications', (message, channel) => {
        const appointmentIds = JSON.parse(JSON.parse(message).data.ids);
        console.log('appointmentIds:', appointmentIds);
        const messageNotification = {
            data: {
                title: 'Thông báo mới!',
                userIDs: appointmentIds,
            }
        };

        // if (
        //     io &&
        //     io.sockets &&
        //     io.sockets.sockets &&
        //     Object.keys(io.sockets.sockets).length > 0
        // ) {
        io.emit('notification', messageNotification);
        // } else {
        //     console.log('No connected sockets to emit notification');
        // }
    });

    subscriber.v4.subscribe('laravel_database_reset_cache', async (message, channel) => {
        const modelsName = JSON.parse(JSON.parse(message).data.model);
        await Promise.all(modelsName.map(async (modelName) => delCaches(modelName)));
    });

    // MongoDB connection
    mongoose.connect(process.env.MONGO_CONNECTION_STRING)
        .then(() => {
            console.log('Connected to database');
            server.listen(PORT, () => {
                console.log(`Server started on port ${PORT}`);
                callRoutes();
            });
        })
        .catch(err => {
            console.log("Error connecting to database: ", err);
        });
})();

