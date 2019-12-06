const axios = require('axios');

const api = axios.create({
    baseURL: 'http://192.168.11.8:3000'
})

export default api;