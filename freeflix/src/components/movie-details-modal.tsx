import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import type { Movie } from "@/shared/objects-interfaces";
import { Badge } from './ui/badge';
import { Calendar, Star, Play } from 'lucide-react';
import { Button } from './ui/button';

const BACKDROP_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w1280';
const POSTER_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

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
    const year = releaseDate ? new Date(releaseDate).getFullYear() : null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl p-0 max-h-[90vh] overflow-hidden">
                <div className="relative">
                    {movie.backdrop_path && (
                        <>
                            <img
                                src={`${BACKDROP_IMAGE_BASE_URL}${movie.backdrop_path}`}
                                alt={`Imagem de fundo de ${title}`}
                                className="w-full h-64 md:h-80 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                        </>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            {movie.poster_path && (
                                <img
                                    src={`${POSTER_IMAGE_BASE_URL}${movie.poster_path}`}
                                    alt={`Pôster de ${title}`}
                                    className="w-32 h-48 object-cover rounded-lg shadow-2xl border-4 border-background"
                                />
                            )}

                            <div className="flex-1 text-white">
                                <DialogTitle className="text-3xl md:text-4xl font-bold mb-2 text-white">
                                    {title}
                                    {year && <span className="text-2xl md:text-3xl font-normal ml-2 text-white/80">({year})</span>}
                                </DialogTitle>

                                <div className="flex flex-wrap gap-4 items-center mb-4">
                                    <div className="flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm rounded-full px-3 py-1">
                                        <Star className="text-yellow-400 fill-current" size={16} />
                                        <span className="font-semibold text-white">{movie.vote_average.toFixed(1)}</span>
                                    </div>

                                    <div className="flex items-center gap-2 bg-background/20 backdrop-blur-sm rounded-full px-3 py-1">
                                        <Calendar className="text-white/80" size={16} />
                                        <span className="text-white/90">{formattedDate}</span>
                                    </div>

                                    <Badge
                                        variant="secondary"
                                        className="bg-primary/20 text-primary-foreground border-primary/30"
                                    >
                                        {movie.media_type === 'movie' ? 'Filme' : 'Série de TV'}
                                    </Badge>
                                </div>

                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                                    <Play className="h-4 w-4 fill-current" />
                                    Assistir Trailer
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-3">Sinopse</h3>
                        <DialogDescription className="text-base leading-relaxed text-muted-foreground">
                            {movie.overview || "Sinopse não disponível."}
                        </DialogDescription>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <h4 className="font-semibold text-lg">Informações</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Avaliação:</span>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                        <span>{movie.vote_average.toFixed(1)}/10</span>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Data de Lançamento:</span>
                                    <span>{formattedDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tipo:</span>
                                    <span>{movie.media_type === 'movie' ? 'Filme' : 'Série de TV'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-semibold text-lg">Gêneros</h4>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline">Ação</Badge>
                                <Badge variant="outline">Aventura</Badge>
                                <Badge variant="outline">Drama</Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};