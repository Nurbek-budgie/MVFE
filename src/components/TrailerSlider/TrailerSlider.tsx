import { useEffect, useState } from "react";
import './TrailerSlider.css';

type Movie = {
    id: number;
    position: number;
    posterUrl: string;
};

function TrailerSlider() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const fetchFeaturedMovies = async () => {
            try {
                const response = await fetch("https://localhost:7109/api/FeaturedMovies");
                const data = await response.json();
                setMovies(data);
            } catch (error: any) {
                throw new Error(error);
            }

        };
        fetchFeaturedMovies();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % movies.length);
        }, 3000); // 3 seconds per slide
        return () => clearInterval(interval);
    }, [movies]);

    if (movies.length === 0) return null;

    return (
        <div className="trailer-slider-container">
            {movies.map((movie, index) => (
                <div key={movie.id} className={`slide ${index === current ? "active" : ""}`}>
                    <img src={`https://localhost:7109${movie.posterUrl}`} className="trailer-slider-card" />
                </div>
            ))}
        </div>
    )
}

export default TrailerSlider;