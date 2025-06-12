import React from 'react';
import type { Movie } from '@/shared/objects-interfaces';
import { MovieCard } from './movie-card';

interface MovieListProps {
    title: string;
    movies: Movie[];
    onMovieClick: (movie: Movie) => void;
}

export const MovieList: React.FC<MovieListProps> = ({ title, movies, onMovieClick }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            <div className="flex space-x-4 overflow-x-auto overflow-y-hidden py-4 scrollbar-hide">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
                ))}
            </div>
        </div>
    );
};