import React from 'react';
import type { Movie } from "@/shared/objects-interfaces";
import { Star, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface MovieCardProps {
    movie: Movie;
    onClick: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
    if (!movie.poster_path) {
        return null;
    }

    const title = movie.title || movie.name;
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() :
        movie.first_air_date ? new Date(movie.first_air_date).getFullYear() : null;

    return (
        <div
            onClick={() => onClick(movie)}
            className="group relative flex-shrink-0 cursor-pointer transform transition-all duration-300 ease-out hover:z-10 hover:scale-105"
        >
            <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={`Pôster de ${title}`}
                    className="w-44 h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-white text-xs font-medium">{movie.vote_average.toFixed(1)}</span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-semibold text-sm line-clamp-2 mb-1">{title}</h3>
                    {releaseYear && (
                        <div className="flex items-center gap-1 text-xs text-gray-300">
                            <Calendar className="h-3 w-3" />
                            {releaseYear}
                        </div>
                    )}
                    {movie.media_type && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                            {movie.media_type === 'movie' ? 'Filme' : 'Série'}
                        </Badge>
                    )}
                </div>
            </div>
        </div>
    );
};