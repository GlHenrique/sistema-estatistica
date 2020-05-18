import axios from 'axios';

const api =
  process.env.NODE_ENV === 'production'
    ? axios.create({
        baseURL: 'https://lookup-api.herokuapp.com',
      })
    : axios.create({
        baseURL: 'http://localhost:3333',
      });

api.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error.response.data) {
      return Promise.reject(error.response.data.errors[0]);
    }
    return Promise.reject(new Error('Erro desconhecido'));
  }
);

export default api;
