import axios from "axios";

/* const BASE_URL = 'https://sisgb-api.vercel.app/'; */
const BASE_URL = 'http://10.0.0.110:9000/';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});