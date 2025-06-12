import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import type { Movie } from "@/shared/objects-interfaces";
import { Badge } from './ui/badge';
import { Calendar, Star } from 'lucide-react';

const BACKDROP_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

interface MovieDetailsModalProps {
    movie: Movie | null;
    isOpen: boolean;
    onClose: () => void;
}

export const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ movie, isOpen, onClose }) => {
    if (!movie) {
        return null;
    }

    const title = movie.title || movie.name;
    const releaseDate = movie.release_date || movie.first_air_date;
    const formattedDate = releaseDate ? new Date(releaseDate).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Data desconhecida';

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl p-0">
                {movie.backdrop_path && (
                    <img
                        src={`${BACKDROP_IMAGE_BASE_URL}${movie.backdrop_path}`}
                        alt={`Imagem de fundo de ${title}`}
                        className="w-full h-48 md:h-64 object-cover rounded-t-lg"
                    />
                )}

                <DialogHeader className="p-6">
                    <DialogTitle className="text-3xl font-bold">{title}</DialogTitle>
                    <DialogDescription className="text-lg pt-4 text-left">
                        {movie.overview || "Sinopse não disponível."}
                    </DialogDescription>
                </DialogHeader>

                <div className="px-6 pb-6 flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2">
                        <Star className="text-yellow-500" size={20} />
                        <span className="font-semibold">{movie.vote_average.toFixed(1)} / 10</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="text-gray-500" size={20} />
                        <span className="text-muted-foreground">{formattedDate}</span>
                    </div>
                    <Badge variant="secondary">{movie.media_type === 'movie' ? 'Filme' : 'Série de TV'}</Badge>
                </div>
            </DialogContent>
        </Dialog>
    );
};