const { createClient } = require('redis');

let redisClient = null;

const getRedisClient = async () => {
    if (redisClient && redisClient.isOpen) {
        return redisClient;
    }

    redisClient = createClient({
        // url: 'redis://redis:6379',
        // socket: {
        //     host: '103.169.35.190',
        //     port: 6380
        // },
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
