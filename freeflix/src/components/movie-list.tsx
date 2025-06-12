import React from 'react';
import type { Movie } from '@/shared/objects-interfaces';
import { MovieCard } from './movie-card';
import { ChevronRight } from 'lucide-react';

interface MovieListProps {
    title: string;
    movies: Movie[];
    onMovieClick: (movie: Movie) => void;
}

export const MovieList: React.FC<MovieListProps> = ({ title, movies, onMovieClick }) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {title}
                </h2>
                <button className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-sm font-medium">
                    Ver todos
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>

            <div className="relative group">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background/90 backdrop-blur-sm border rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
                >
                    <ChevronRight className="h-4 w-4 rotate-180" />
                </button>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background/90 backdrop-blur-sm border rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>

                <div
                    ref={scrollRef}
                    className="flex space-x-6 overflow-x-auto overflow-y-hidden py-4 scrollbar-hide scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
                    ))}
                </div>

                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
            </div>
        </div>
    );
};