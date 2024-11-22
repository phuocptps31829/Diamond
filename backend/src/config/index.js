const redis = require('redis');
const http = require('http');
const { Server } = require("socket.io");
const app = require('../../app');

const TTL_CACHE = 60 * 60; // 1 hour

// Express app initialization
const server = http.createServer(app);

// Socket initialization
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Redis initialization
const redisClient = redis.createClient({
    // url: 'redis://redis:6379',
    legacyMode: true
});

module.exports = {
    redisClient,
    io,
    server,
    TTL_CACHE
};