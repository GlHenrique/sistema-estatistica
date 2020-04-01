import axios from 'axios';

let api;

if (process.env.NODE_ENV === 'production') {
    api = axios.create({
        baseURL: 'https://lookup-api.herokuapp.com'
    });
} else {
    api = axios.create({
        baseURL: 'http://localhost:3333'
    });
}


export default api;