const axios = require('axios');

const routesToInitCache = [
    // Common
    {
        method: 'GET',
        endpoint: 'api/v1/appointments?page=1',
    },
    {
        method: 'GET',
        endpoint: 'api/v1/medical-packages?page=1',
    },
    {
        method: 'GET',
        endpoint: 'api/v1/services?page=1',
    },
    {
        method: 'GET',
        endpoint: 'api/v1/doctors?page=1',
    },
    {
        method: 'GET',
        endpoint: 'api/v1/patients?page=1',
    },
    // Limit 9
    {
        method: 'GET',
        endpoint: 'api/v1/services?page=1&limit=9',
    },
    {
        method: 'GET',
        endpoint: 'api/v1/medical-packages?page=1&limit=9',
    },
    // No pagination
    {
        method: 'GET',
        endpoint: 'api/v1/appointments?noPaginated=true',
    },
    {
        method: 'GET',
        endpoint: 'api/v1/specialties?noPaginated=true',
    },
    {
        method: 'GET',
        endpoint: 'api/v1/doctors?noPaginated=true',
    },
    {
        method: 'GET',
        endpoint: 'api/v1/medicine-categories?noPaginated=true',
    },
];

const callRoutes = async () => {
    Promise.all(
        routesToInitCache.map(async (route) => {
            const { method, endpoint } = route;
            const res = await axios({
                method,
                url: `http://localhost:3500/${endpoint}`,
            });
            return res;
        })
    );
};

module.exports = {
    callRoutes
};