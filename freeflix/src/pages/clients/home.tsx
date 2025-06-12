import React from "react";
import { motion } from 'framer-motion';
import type { ApiMoviesResponse, Movie } from "@/shared/objects-interfaces";
import api from "@/service/api";
import { MovieDetailsModal } from "@/components/movie-details-modal";
import { MovieList } from "@/components/movie-list";
import { Skeleton } from "@/components/ui/skeleton";
import { HeroSection } from "@/components/hero-section";

const LoadingSkeleton = () => (
    <>
        <Skeleton className="h-[50vh] w-full" />
        <div className="container mx-auto p-4 md:p-6 space-y-12">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-4">
                    <Skeleton className="h-8 w-64" />
                    <div className="flex space-x-4">
                        {[...Array(5)].map((_, j) => (
                            <Skeleton key={j} className="h-60 w-44" />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </>
);

export default function Home() {
    const [trending, setTrending] = React.useState<Movie[]>([]);
    const [popularMovies, setPopularMovies] = React.useState<Movie[]>([]);
    const [topRatedMovies, setTopRatedMovies] = React.useState<Movie[]>([]);
    const [popularTvShows, setPopularTvShows] = React.useState<Movie[]>([]);
    const [upcomingMovies, setUpcomingMovies] = React.useState<Movie[]>([]);

    const [heroMovie, setHeroMovie] = React.useState<Movie | null>(null);

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
                    fetchMovies('/trending/movie/week'),
                    fetchMovies('/movie/popular'),
                    fetchMovies('/movie/top_rated'),
                    fetchMovies('/tv/popular'),
                    fetchMovies('/movie/upcoming'),
                ]);

                setHeroMovie(trendingResults[Math.floor(Math.random() * trendingResults.length)]);

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
        return <p className="flex justify-center items-center h-screen text-red-500 text-xl">{error}</p>;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <HeroSection movie={heroMovie} onMoreInfoClick={handleMovieClick} />

            <div className="container mx-auto p-4 md:p-6 space-y-12">
                <MovieList
                    title="Em Alta na Semana"
                    movies={trending}
                    onMovieClick={handleMovieClick}
                />
                <MovieList
                    title="Filmes Populares"
                    movies={popularMovies}
                    onMovieClick={handleMovieClick}
                />
                <MovieList
                    title="Séries Populares"
                    movies={popularTvShows}
                    onMovieClick={handleMovieClick}
                />
                <MovieList
                    title="Filmes Mais Votados"
                    movies={topRatedMovies}
                    onMovieClick={handleMovieClick}
                />
                <MovieList
                    title="Em Breve nos Cinemas"
                    movies={upcomingMovies}
                    onMovieClick={handleMovieClick}
                />
            </div>

            <MovieDetailsModal
                movie={selectedMovie}
                isOpen={!!selectedMovie}
                onClose={handleCloseModal}
            />
        </motion.div>
    );
}
