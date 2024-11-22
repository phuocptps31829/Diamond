const getRedisClient = require('../config/redisClient');

const cache = (key) => {
    return async (req, res, next) => {
        try {
            const redisClient = await getRedisClient();

            const customKey = Object.keys(req.query).reduce((acc, curr) => {
                return acc + curr + req.query[curr];
            }, key);

            redisClient.GET(customKey, (err, data) => {
                if (err) {
                    console.error('Redis error:', err);
                    return next();
                }

                if (data) {
                    console.log('Cache hit for:', customKey);
                    return res.send(JSON.parse(data));
                }

                const originalSend = res.send;
                res.send = (body) => {
                    redisClient.SETEX(customKey, 3600, JSON.stringify(body), (err) => {
                        if (err) {
                            console.error("Error setting cache:", err);
                        }
                    });
                    res.send = originalSend;
                    return res.send(body);
                };

                next();
            });
        } catch (error) {
            console.error('Error in cache middleware:', error);
            next();
        }
    };
};

module.exports = {
    cache
};