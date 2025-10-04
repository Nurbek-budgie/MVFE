import { useQuery, useQueryClient } from '@tanstack/react-query';
import ScreenType from '../../components/ScreenType/ScreenType';
import './IMax.css'

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


function IMax() {
    const queryClient = useQueryClient();
    const { data: theaters2 = []} = useQuery<Theater[]>({
        queryKey: ['theaters'],
        queryFn: async() => {
            const res = await fetch('https://localhost:7109/api/screens/type/IMAX');
            if (!res.ok) throw new Error("Failed to fetch");
            return res.json();
        },
    });

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
                <ScreenType  theaters={theaters2} />
            </div>

        </div>
    );

}

export default IMax;