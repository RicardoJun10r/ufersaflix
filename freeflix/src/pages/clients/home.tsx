import React from "react";
import type { ApiMoviesResponse, Movie } from "@/shared/objects-interfaces";
import api from "@/service/api";
import { MovieDetailsModal } from "@/components/movie-details-modal";
import { MovieList } from "@/components/movie-list";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => (
    <div className="space-y-12 py-8">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
                <Skeleton className="h-8 w-64" />
                <div className="flex space-x-4 overflow-hidden">
                    {[...Array(5)].map((_, j) => (
                        <Skeleton key={j} className="h-60 w-40" />
                    ))}
                </div>
            </div>
        ))}
    </div>
);


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
        return <p className="flex justify-center items-center h-screen text-red-500 text-xl">{error}</p>;
    }

    return (
        <div className="space-y-12 py-8">
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

            <MovieDetailsModal
                movie={selectedMovie}
                isOpen={!!selectedMovie}
                onClose={handleCloseModal}
            />
        </div>
    );
}