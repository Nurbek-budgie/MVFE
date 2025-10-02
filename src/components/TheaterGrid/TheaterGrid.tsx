import { Link } from "react-router-dom";
import './TheaterGrid.css';
import { useQuery, useQueryClient } from "@tanstack/react-query";

type Theater = {
    id: number;
    name: string;
    logoUrl: string;
}

function TheaterGrid() {
    const queryClient = useQueryClient();
    const { data: theaters = [] } = useQuery<Theater[]>({
        queryKey: ['theaters'],
        queryFn: async () => {
            const res = await fetch('https://localhost:7109/api/theaters');
            if (!res.ok) throw new Error("Failed to fetch");
            return res.json();
        }
    });

    return (
        <div className="theater-grid">
            {
                theaters.map((theater) => (
                    <Link to={`cinema/${theater.id}`}
                        className="cinema-link"
                        key={theater.id}>
                        <div className="theater-card">
                            <div className="cinema-logo-wrap">
                                <img src={`https://localhost:7109${theater.logoUrl}`} key={theater.id} className="theater-card-logo" />
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