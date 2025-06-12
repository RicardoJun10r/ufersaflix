import React from 'react';
import type { Movie } from "@/shared/objects-interfaces";
import { motion } from 'framer-motion';

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
        <motion.div
            layoutId={`card-${movie.id}`}
            className="group relative flex-shrink-0 cursor-pointer w-44"
        >
            <div className="relative transform transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:z-20">
                <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={`Pôster de ${title}`}
                    className="w-full h-auto object-cover rounded shadow-lg"
                />
                <div
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded p-3 flex flex-col justify-end"
                    onClick={() => onClick(movie)}
                >
                    <h3 className="text-white font-bold text-base truncate">{title}</h3>
                </div>
            </div>
        </motion.div>
    );
};
