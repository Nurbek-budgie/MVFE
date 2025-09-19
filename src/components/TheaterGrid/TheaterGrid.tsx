import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './TheaterGrid.css';

type Theater = {
    id: number;
    name: string;
    logoUrl: string;
}

function TheaterGrid() {

    const [theaters, setTheaters] = useState<Theater[]>([]);

    useEffect(() => {
        const fetchTheatersAsync = async () => {
            try {
                const response = await fetch("https://localhost:7109/api/theaters");
                const data = await response.json();

                setTheaters(data);
            } catch (error: any) {
                throw new Error("Error fetching data", error);
            }
        }

        fetchTheatersAsync();
    },[]);

    return (
        <div className="theater-grid">
            {
                theaters.map((theater) => (
                    <Link to={`cinema/${theater.id}`}
                    className="cinema-link"
                    key={theater.id}>
                        <div className="theater-card">
                            <div className="cinema-logo-wrap">
                                <img src={`https://localhost:7109${theater.logoUrl}`} key={theater.id} className="theater-card-logo"/>
                            </div>
                        </div>
                        <div className="theater-card-text-wrapper">
                                <div className="theater-card-text">{theater.name}</div>
                            </div>
                    </Link>
                ))
            }
        </div>

    )
}

export default TheaterGrid;