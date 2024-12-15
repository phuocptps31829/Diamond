const axios = require('axios');
const getRedisClient = require('../config/redisClient');

const superScretkey = process.env.SUPER_SECRET_KEY;

const routesToInitCache = [
    // Common
    {
        method: 'GET',
        endpoint: 'api/v1/appointments?page=1&limit=10&secretKey=' + superScretkey,
    },
    {
        method: 'GET',
        endpoint: 'api/v1/appointments/specialty?secretKey=' + superScretkey,
    },
    {
        method: 'GET',
        endpoint: 'api/v1/medical-packages?page=1&limit=10&secretKey=' + superScretkey,
    },
    {
        method: 'GET',
        endpoint: 'api/v1/services?page=1&limit=10&secretKey=' + superScretkey,
    },
    {
        method: 'GET',
        endpoint: 'api/v1/doctors?page=1&limit=10&secretKey=' + superScretkey,
    },
    {
        method: 'GET',
        endpoint: 'api/v1/patients?page=1&limit=10&secretKey=' + superScretkey,
    },
    {
        method: 'GET',
        endpoint: 'api/v1/medicines?page=1&limit=10&secretKey=' + superScretkey,
    },
    {
        method: 'GET',
        endpoint: 'api/v1/medicine-categories?page=1&limit=10&secretKey=' + superScretkey,
    },
    {
        method: 'GET',
        endpoint: 'api/v1/work-schedules?page=1&limit=10&secretKey=' + superScretkey,
    },
    // Limit 9
    {
        method: 'GET',
        endpoint: 'api/v1/services?page=1&limit=9&secretKey=' + superScretkey,
    },
    {
        method: 'GET',
        endpoint: 'api/v1/medical-packages?page=1&limit=9&secretKey=' + superScretkey,
    },
    // No pagination
    {
        method: 'GET',
        endpoint: 'api/v1/appointments?noPaginated=true&secretKey=' + superScretkey,
    },
    {
        method: 'GET',
        endpoint: 'api/v1/specialties?noPaginated=true&secretKey=' + superScretkey,
    },
    {
        method: 'GET',
        endpoint: 'api/v1/services?noPaginated=true&secretKey=' + superScretkey,
    },
    {
        method: 'GET',
        endpoint: 'api/v1/medical-packages?noPaginated=true&secretKey=' + superScretkey,
    },
    {
        method: 'GET',
        endpoint: 'api/v1/doctors?noPaginated=true&secretKey=' + superScretkey,
    },
    {
        method: 'GET',
        endpoint: 'api/v1/medicine-categories?noPaginated=true&secretKey=' + superScretkey,
    },
    {
        method: 'GET',
        endpoint: 'api/v1/news?noPaginated=true&secretKey=' + superScretkey,
    },
];

const callRoutes = async (keyName) => {
    let filterredRoutes = routesToInitCache;

    if (keyName) {
        filterredRoutes = routesToInitCache.filter((route) => route.endpoint.includes(keyName));
    }

    Promise.all(
        filterredRoutes.map(async (route) => {
            const { method, endpoint } = route;
            const res = await axios({
                method,
                // url: `${process.env.SERVER_LIVE_URL}/${endpoint}`,
                url: `http://localhost:3500/${endpoint}`,
            });
            return res;
        })
    );
};

const delCaches = async (keyName) => {
    try {
        const redisClient = await getRedisClient();

        redisClient.keys(`${keyName}:*`, async (err, keys) => {
            if (err) {
                console.error('Error when get keys: ', err);
                return;
            }

            if (keys.length > 0) {
                await redisClient.del(keys);
                console.log(`Deleted keys: ${keys.join(', ')}`);
            }
        });
    } catch (error) {
        console.error('Error when delete key: ', error);
    }
};

module.exports = {
    callRoutes,
    delCaches
};