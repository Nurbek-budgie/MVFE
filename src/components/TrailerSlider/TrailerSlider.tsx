import { useEffect, useState } from "react";
import './TrailerSlider.css';
import { useQuery, useQueryClient } from "@tanstack/react-query";

type Movie = {
    id: number;
    position: number;
    posterUrl: string;
};

function TrailerSlider() {
    const queryClient = useQueryClient();
    const [current, setCurrent] = useState(0);
    const { data: movies = [] } = useQuery<Movie[]>({
        queryKey: ['featured-movies'],
        queryFn: async () => {
            const res = await fetch('https://localhost:7109/api/featuredmovies');
            if (!res.ok) throw new Error('failed to fetch');
            return res.json();
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % movies.length);
        }, 4000); // 4 seconds per slide
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