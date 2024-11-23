const { createClient } = require('redis');

let redisClient = null;

const getRedisClient = async () => {
    if (redisClient && redisClient.isOpen) {
        return redisClient;
    }

    redisClient = createClient({
        // url: 'redis://redis:6379',
        socket: {
            host: '160.30.44.27',
            port: 6379
        },
        legacyMode: true
    });

    redisClient.on('error', (err) => {
        console.error('Redis error:', err);
    });

    await redisClient.connect();
    console.log('Redis connected');

    return redisClient;
};

module.exports = getRedisClient;
