

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'

const fetch = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export default fetch;