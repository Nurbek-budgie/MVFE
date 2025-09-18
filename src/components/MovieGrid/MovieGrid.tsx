import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './MovieGrid.css'

type Movie = {
    id: number;
    title: string;
    posterUrl: string;
};

function MovieGrid() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch("https://localhost:7109/api/movies");
                if (!response) {
                    throw new Error("Failed to fetch");
                }
                const data = await response.json();
                setMovies(data);
            } catch (err: any) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        }

        fetchMovies();
    }, []);

    if (loading) return <p>Loading movies...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;


    return (
        <div className="movie-grid">
            {
                movies.map((movie) => (
                    <Link to={`/movie/${movie.id}`}
                        key={movie.id}
                        className="movie-detail-link"
                    >
                        <div key={movie.id} className="movie-card">
                            <img src={`https://localhost:7109${movie.posterUrl}`} // prepend backend URL
                                alt={movie.title}
                                className="movie-poster" />
                            <h3>{movie.title}</h3>
                        </div>
                    </Link>

                ))
            }
        </div>
    )
}

export default MovieGrid;