import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5/'
})