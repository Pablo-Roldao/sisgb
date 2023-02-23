import axios from "axios";

export default axios.create({
    baseURL: 'https://sisgb-api.vercel.app/'
});