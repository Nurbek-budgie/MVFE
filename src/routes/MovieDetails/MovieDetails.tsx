import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './MovieDetails.css'

type Movie = {
    id: number;
    title: string;
    description: string;
    duration: number;
    posterUrl: string;
    trailerUrl: string;
    language: string;
    // screenings
};

function MovieDetails() {
    const { id } = useParams();

    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const responce = await fetch(`https://localhost:7109/api/movies/${id}`);
                if (!responce) {
                    throw new Error("Failed to fetch");
                }

                const data = await responce.json();

                setMovie(data);
            } catch (error: any) {
                console.log(error)
            }
        }

        fetchMovie();
    }, [id]);

    return <div>
        <div className="movie-detail-container">
            <div className="movie-detail-card">
                <img
                src={`https://localhost:7109${movie?.trailerUrl}`}
                alt={movie?.title}
                className="movie-trailer"
                />
                <h3>{movie?.title}</h3>
            </div>
        </div>
    </div>
}

export default MovieDetails;