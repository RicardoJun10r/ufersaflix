import React from 'react';
import { motion } from 'framer-motion';
import type { Movie } from '@/shared/objects-interfaces';
import { Button } from './ui/button';
import { Info, PlayCircle } from 'lucide-react';
import { Badge } from './ui/badge';

const BACKDROP_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

interface HeroSectionProps {
    movie: Movie | null;
    onMoreInfoClick: (movie: Movie) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ movie, onMoreInfoClick }) => {
    if (!movie) {
        return <div className="h-[50vh] w-full bg-muted animate-pulse" />;
    }

    const title = movie.title || movie.name;

    return (
        <div
            className="relative h-[50vh] md:h-[65vh] w-full flex items-end p-8 md:p-12 text-white"
            style={{
                backgroundImage: `url(${BACKDROP_IMAGE_BASE_URL}${movie.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

            <motion.div
                className="relative z-10 w-full md:w-1/2 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <h1 className="text-4xl md:text-6xl font-black drop-shadow-lg">{title}</h1>
                <p className="text-sm md:text-base line-clamp-3 drop-shadow-md">
                    {movie.overview}
                </p>
                <div className='flex items-center gap-2'>
                    <Badge variant="destructive">{movie.media_type === 'movie' ? 'Filme' : 'Série'}</Badge>
                    <Badge variant="secondary">{new Date(movie.release_date || movie.first_air_date!).getFullYear()}</Badge>
                </div>
                <div className="flex gap-4 pt-4">
                    <Button size="lg">
                        <PlayCircle className="mr-2 h-6 w-6" /> Assistir
                    </Button>
                    <Button size="lg" variant="secondary" onClick={() => onMoreInfoClick(movie)}>
                        <Info className="mr-2 h-6 w-6" /> Mais Informações
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};
