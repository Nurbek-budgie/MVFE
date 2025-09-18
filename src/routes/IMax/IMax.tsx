import ScreenType from '../../components/ScreenType/ScreenType';
import './IMax.css'
import { useEffect, useState } from "react";

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


function IMax() {
    const [screenType, setScreenType] = useState<Theater[]>([]);

    useEffect(() => {
        const fetchScreenType = async () => {
            try {
                const response = await fetch("https://localhost:7109/screens/type/IMAX");
                const rawData = await response.json();

                const data: Theater[] = rawData.map((theater: any) => ({
                    ...theater,
                    movies: theater.movies.map((movie: any) => ({
                        ...movie,
                        showtimes: movie.showtimes.map((st: any) => ({
                            time: new Date(st.time)
                        }))
                    }))
                })); // Study how does map works

                setScreenType(data);
            } catch (error: any) {
                throw new Error("Something wrong with fecthing data");
            }
        };

        fetchScreenType();
    }, []);

    return (
        <div className="imax-container">
            <div className="imax-text-container">
                <h1>IMAX</h1>
                <hr></hr>
                <div className="imax-text-buttons-container">
                    <h3>IMax Screens</h3>
                    <h3>Soon Available on Screens</h3>
                </div>
            </div>
            <div className="imax-screens-container">
                <h2>Today’s movie repertoire in the IMAX hall:</h2>
                <ScreenType  theaters={screenType} />
            </div>

        </div>
    );

}

export default IMax;