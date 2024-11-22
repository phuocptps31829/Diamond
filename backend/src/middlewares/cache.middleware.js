const config = require("../config");

const cache = (key) => {
    console.log('Cache middleware for key:', key);
    console.log('Redis client:', config.redisClient);
    return (req, res, next) => {
        config.redisClient.GET(key, (err, data) => {
            if (err) {
                console.error(err);
                next();
                return;
            }

            if (data) {
                console.log('Cache hit for key:', key);
                return res.status(200).json(JSON.parse(data)); // Return cached data
            }

            // If cache miss, pass to next middleware
            next();
        });
    };
};

module.exports = {
    cache
};