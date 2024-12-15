const { promisify } = require('util');
const getRedisClient = require('../config/redisClient');

const cache = (key) => {
    return async (req, res, next) => {
        try {
            const redisClient = await getRedisClient();

            const customKey = Object.keys(req.query).reduce((acc, curr) => {
                return acc + curr + req.query[curr];
            }, key);

            const getAsync = promisify(redisClient.GET).bind(redisClient);
            const setexAsync = promisify(redisClient.SETEX).bind(redisClient);

            const data = await getAsync(customKey);
            if (data) {
                console.log('Cache hit for:', customKey);
                return res.json(JSON.parse(data));
            }

            const originalSend = res.json.bind(res);
            res.json = async (body) => {
                try {
                    await setexAsync(customKey, 3600, JSON.stringify(body));
                    console.log('Cached for:', customKey);
                } catch (err) {
                    console.error("Error setting cache:", err);
                }
                return originalSend(body);
            };

            next();
        } catch (error) {
            console.error('Error in cache middleware:', error);
            next(error);
        }
    };
};

module.exports = {
    cache
};
