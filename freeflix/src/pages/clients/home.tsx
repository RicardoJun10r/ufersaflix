import React from "react";
import type { ApiMoviesResponse, Movie } from "@/shared/objects-interfaces";
import api from "@/service/api";
import { MovieDetailsModal } from "@/components/movie-details-modal";
import { MovieList } from "@/components/movie-list";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Calendar, Film } from "lucide-react";

const LoadingSkeleton = () => (
    <div className="space-y-12 py-8">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-6">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-64" />
                </div>
                <div className="flex space-x-6 overflow-hidden">
                    {[...Array(5)].map((_, j) => (
                        <div key={j} className="flex-shrink-0 space-y-3">
                            <Skeleton className="h-64 w-44 rounded-xl" />
                            <Skeleton className="h-4 w-36" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

const HeroSection = ({ movie }: { movie: Movie | null }) => {
    if (!movie) return null;

    const title = movie.title || movie.name;
    const BACKDROP_URL = 'https://image.tmdb.org/t/p/w1280';

    return (
        <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-12">
            {movie.backdrop_path && (
                <>
                    <img
                        src={`${BACKDROP_URL}${movie.backdrop_path}`}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{title}</h1>
                    <p className="text-lg text-white/90 mb-6 line-clamp-3">
                        {movie.overview}
                    </p>
                    <div className="flex items-center gap-4 text-white/80">
                        <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 text-yellow-400 fill-current" />
                            <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="h-5 w-5" />
                            <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Home() {
    const [trending, setTrending] = React.useState<Movie[]>([]);
    const [popularMovies, setPopularMovies] = React.useState<Movie[]>([]);
    const [topRatedMovies, setTopRatedMovies] = React.useState<Movie[]>([]);
    const [popularTvShows, setPopularTvShows] = React.useState<Movie[]>([]);
    const [upcomingMovies, setUpcomingMovies] = React.useState<Movie[]>([]);

    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);

    React.useEffect(() => {
        const fetchMovies = async (endpoint: string) => {
            const response = await api.get<ApiMoviesResponse>(endpoint);
            return response.data.results;
        };

        async function loadAllContent() {
            try {
                const [
                    trendingResults,
                    popularMoviesResults,
                    topRatedMoviesResults,
                    popularTvShowsResults,
                    upcomingMoviesResults,
                ] = await Promise.all([
                    fetchMovies('/trending/all/week'),
                    fetchMovies('/movie/popular'),
                    fetchMovies('/movie/top_rated'),
                    fetchMovies('/tv/popular'),
                    fetchMovies('/movie/upcoming'),
                ]);

                setTrending(trendingResults);
                setPopularMovies(popularMoviesResults);
                setTopRatedMovies(topRatedMoviesResults);
                setPopularTvShows(popularTvShowsResults);
                setUpcomingMovies(upcomingMoviesResults);

            } catch (err) {
                setError('Não foi possível carregar o conteúdo. Tente novamente mais tarde.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadAllContent();
    }, []);

    const handleMovieClick = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
    };

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-screen space-y-4">
                <Film className="h-16 w-16 text-muted-foreground" />
                <p className="text-red-500 text-xl font-medium">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Tentar Novamente
                </button>
            </div>
        );
    }

    const heroMovie = trending[0] || popularMovies[0];

    return (
        <div className="space-y-12 py-8">
            <HeroSection movie={heroMovie} />

            <div className="space-y-12">
                <MovieList
                    title="🔥 Em Alta na Semana"
                    movies={trending}
                    onMovieClick={handleMovieClick}
                />
                <MovieList
                    title="🎬 Filmes Populares"
                    movies={popularMovies}
                    onMovieClick={handleMovieClick}
                />
                <MovieList
                    title="📺 Séries Populares"
                    movies={popularTvShows}
                    onMovieClick={handleMovieClick}
                />
                <MovieList
                    title="⭐ Filmes Mais Votados"
                    movies={topRatedMovies}
                    onMovieClick={handleMovieClick}
                />
                <MovieList
                    title="🎭 Em Breve nos Cinemas"
                    movies={upcomingMovies}
                    onMovieClick={handleMovieClick}
                />
            </div>

            <MovieDetailsModal
                movie={selectedMovie}
                isOpen={!!selectedMovie}
                onClose={handleCloseModal}
            />
        </div>
    );
}