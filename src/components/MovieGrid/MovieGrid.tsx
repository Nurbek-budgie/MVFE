import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './MovieGrid.css'
import { useQuery, useQueryClient } from "@tanstack/react-query";

type Movie = {
    id: number;
    title: string;
    posterUrl: string;
};

function MovieGrid() {
    const queryClient = useQueryClient();

    const { data: movies = [], isLoading, isError} = useQuery<Movie[]>({
        queryKey: ['movies'],
        queryFn: async () => {
            const res = await fetch('https://localhost:7109/api/movies')
            if (!res.ok) throw new Error("failed to fetch");

            return res.json();
        },
    });


    if (isLoading) return <p>Loading....</p>
    if (isError) return <p>Error fecthing</p>
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
                            <div className="movie-card-wrapper">
                                <div className="movie-card-title">{movie.title}</div>
                            </div>
                        </div>
                    </Link>

                ))
            }
        </div>
    )
}

export default MovieGrid;