import type React from "react";
import './ScreenType.css'
import ScreeningButton from "../ScreeningButton/ScreeningButton";

type ShowTime = {
    screeningId: number;
    screenName: string;
    basePrice: number;
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
                                        {/* {showtime.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} */}
                                        {<ScreeningButton screening={{
                                            id: showtime.screeningId,
                                            startTime: showtime.time,
                                            basePrice: showtime.basePrice,
                                            movieTitle: movie.movieName,
                                            screenName: showtime.screenName,
                                        }} />}
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