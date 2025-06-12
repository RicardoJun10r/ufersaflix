import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: API_KEY,
        language: 'pt-BR'
    }
})

export default api;
