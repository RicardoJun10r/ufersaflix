export interface Movie {
    id: number;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    vote_average: number;
    media_type: 'movie' | 'tv';

    // Propriedades de Filme
    title?: string;
    release_date?: string;

    // Propriedades de Série de TV
    name?: string;
    first_air_date?: string;
}

export interface ApiMoviesResponse {
    results: Movie[];
}