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

api.interceptors.response.use(
    res => {
      return res.data;
    },
    error => {
      if (error.response.data) {
        return Promise.reject(error.response.data.errors[0]);
      }
      return Promise.reject(new Error('Erro desconhecido'));
    }
  );


export default api;