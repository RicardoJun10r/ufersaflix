import React from 'react';
import type { Movie } from "@/shared/objects-interfaces";
import { cn } from '@/lib/utils';

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

    return (
        <div
            onClick={() => onClick(movie)}
            className="group relative flex-shrink-0 cursor-pointer transform transition-transform duration-200 ease-in-out hover:z-10 hover:scale-110"
        >
            <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={`Pôster de ${title}`}
                className={cn(
                    "w-40 h-auto object-cover rounded shadow-lg",
                    "group-hover:ring-2 group-hover:ring-white"
                )}
            />
        </div>
    );
};