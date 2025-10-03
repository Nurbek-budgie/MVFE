import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './MovieDetails.css'
import ScreeningButton from "../../components/ScreeningButton/ScreeningButton";
import AddScreeningModal from "../../components/AddScreeningModal/AddScreeningModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type Movie = {
    id: number;
    title: string;
    description: string;
    duration: number;
    posterUrl: string;
    trailerUrl: string;
    language: string;
    cast: string;
    releaseDate: Date;
    theaters: Theater[];
};

type Theater = {
    id: number;
    theaterName: string;
    screens: Screen[];
};

type Screen = {
    id: number;
    screenName: string;
    screenings: Screening[];
};

type Screening = {
    id: number;
    startTime: string,
    basePrice: number;
};


// TODO
function MovieDetails() {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [movie, setMovie] = useState<Movie | null>(null);
    const [selectedScreening, setSelectedScreening] = useState<Screening | null>(null);
    const { data: movie, isLoading, isError } = useQuery<Movie>({
        queryKey: ['movie-theaters', id],
        queryFn: async () => {
            const res = await fetch(`https://localhost:7109/api/movies/${id}/screenings`);
            if (!res.ok) throw new Error("Failed to fetch");
            return res.json();
        },
    });
    // const { data: movie } = useQuery<Movie>({
    //     queryKey: ['movie'],
    //     queryFn: async () => {
    //         const res = await fetch(`https://localhost:7109/api/movies/${id}`);
    //         if (!res.ok) throw new Error("Failed to fetch");
    //         return res.json();
    //     },
    // });
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error fetching movie theaters</p>;


    const handleOpenModal = (screening: Screening) => {
        setSelectedScreening(screening);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedScreening(null);
    };


    return (
        <div>
            <div className="movie-detail-container">
                <div className="movie-detail-card">
                    <img
                        src={`https://localhost:7109${movie?.trailerUrl}`}
                        alt={movie?.title}
                        className="movie-trailer"
                    />
                    <h3>{movie?.title}</h3>
                </div>

                <div className="movie-detail-date">
                    <h2>Select date for booking</h2>
                </div>

                <div className="movie-detail-screenings">
                    {movie?.theaters?.map((theater) => (
                        <div key={theater.id} className="theater-wrapper">
                            <div className="movie-detail-theater">
                                <h3>{theater.theaterName}</h3>
                            </div>
                            <div className="movie-detail-screen">
                                {theater.screens?.map((screen) => (
                                    <div className="screen-wrapper">
                                        <div key={screen.id} className="movie-detail-screen-det">
                                            <h4>{screen.screenName}</h4>
                                        </div>
                                        <div className="movie-detail-screening" >
                                            {screen.screenings?.map((screening) => (
                                                <ScreeningButton key={screening.id} screening={{
                                                    id: screening.id,
                                                    startTime: screening.startTime,
                                                    basePrice: screening.basePrice,
                                                    movieTitle: movie.title,
                                                    screenName: screen.screenName
                                                }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="movie-details-modal-overlay">
                    <div className="movie-details-modal-content">
                        <AddScreeningModal onClose={handleCloseModal} />
                    </div>
                </div>
            )}
        </div>
    );

}

export default MovieDetails;