import { useEffect, useState } from "react";
import './DolbyVision.css'
import ScreenType from "../../components/ScreenType/ScreenType";

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

function DolbyVision() {

    const [screenTypeDolby, setScreenType] = useState<Theater[]>([]);

    useEffect(() => {
        const fetchScreenType = async () => {
            try {
                const response = await fetch("https://localhost:7109/screens/type/DolbyAtmos");
                const rawData = await response.json();

                const data: Theater[] = rawData.map((theater: any) => ({
                    ...theater,
                    movies: theater.movies.map((movie: any) => ({
                        ...movie,
                        showtimes: movie.showtimes.map((showtime: any) => ({
                            time: new Date(showtime.time)
                        }))
                    }))
                }));
                
                setScreenType(data);
            } catch (error: any) {
                throw new Error("error fetching data", error);
            }
        };
        fetchScreenType();
    }, []);

    return(
        <>
        <div className="dolby-container">
            <div className="dolby-text-container">
                <h1>DolbyVision</h1>
                <hr></hr>
                <div className="dolby-text-buttons-container">
                    <h3>DolbyVision Screens</h3>
                    <h3>Soon Available on Screens</h3>
                </div>
            </div>
            <div className="dolby-screens-container">
                <h2>Today’s movie repertoire in the DolbyVision hall:</h2>
                <ScreenType  theaters={screenTypeDolby} />
            </div>

        </div>
        </>
    )
}

export default DolbyVision;