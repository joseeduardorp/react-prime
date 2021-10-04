import axios from 'axios';

// url
// https://api.themoviedb.org/3/
// /movie/now_playing &language=pt-BR &page=1

export const key = 'cd876b09ae4c94ec26a4b9b95a68636b';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
});

export default api;