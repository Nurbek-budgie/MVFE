import type React from "react";
import './ScreenType.css'

type ShowTime = {
    time: string;
};

type Movie = {
    movieId: number;
    movieName: string;
    showtimes: ShowTime[];
};

type Theater = {
    cinemaId: number;
    cinemaName: string;
    movies: Movie[];
};


type Props = {
    theaters: Theater[];
};

const ScreenType: React.FC<Props> = ({ theaters }) => {

    return (
        <>
        {
            theaters.map((theater) => (
                <div key={theater.cinemaId} className="screen-theater-container">
                    <div className="screen-theater-header">
                        {theater.cinemaName}
                    </div>
                    {theater.movies.map((movie) => (
                        <div key={movie.movieId} className="screen-movie-container">
                            <div className="screen-movie-name">{movie.movieName}</div>
                            <div className="screen-showtime-list">
                                {movie.showtimes.map((showtime, index) => (
                                    <div key={index} className="screen-showtime">
                                        {showtime.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div> 
            ))
        }
        </>
    )

}

export default ScreenType;