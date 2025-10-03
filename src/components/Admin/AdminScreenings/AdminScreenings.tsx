import { useState } from 'react';
import './AdminScreenings.css';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type Screening = {
    id: number;
    movieId: number;
    screenId: number;
    startTime: string;
    endTime: string;
    basePrice: number;
    availableSeats: number;
    isActive: boolean;
}


function AdminScreenings() {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModal] = useState(false);
    const [newScreening, setNewScreening] = useState({
        movieId: '',
        screenId: '',
        startTime: '',
        endTime: '',
        basePrice: '',
        availableSeats: '',
    });

    const { data: screenings = [] } = useQuery<Screening[]>({
        queryKey: ['screenings'],
        queryFn: async () => {
            const res = await fetch('https://localhost:7109/api/screenings');
            if (!res.ok) throw new Error("failed to fetch");
            return res.json();
        },
    });

    const createScreeningMutation = useMutation({
        mutationFn: async (screeningData: typeof newScreening) => {
            const res = await fetch('https://localhost:7109/api/screenings',
                {
                    method: 'Post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(screeningData),
                }
            );
            if (!res.ok) throw new Error("Failed to create a screening");

            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['screenings'] });
            setIsModal(false);
            setNewScreening({
                movieId: '',
                screenId: '',
                startTime: '',
                endTime: '',
                basePrice: '',
                availableSeats: '',
            });
        }
    })

    const handleCloseModal = () => {
        setIsModal(false);
    };

    const handleOpenModal = () => {
        setIsModal(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewScreening(prev => ({ ...prev, [name]: value }));
    };

    // Handle Inputs
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // ✅ Basic validation
        if (
            !newScreening.movieId ||
            !newScreening.screenId ||
            !newScreening.startTime ||
            !newScreening.endTime ||
            !newScreening.basePrice ||
            !newScreening.availableSeats
        ) {
            alert('Please fill in all fields');
            return;
        }
        createScreeningMutation.mutate(newScreening);
    };


    return (
        <div className="screening-container">
            <button onClick={handleOpenModal}>Add Screening</button>
            <table className="screening-table" border={1}>
                <thead>
                    <tr>
                        <th>MovieId</th>
                        <th>Available Seats</th>
                        <th>Base Price</th>
                        <th>ScreenId</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {screenings.map((screening) => (
                        <tr key={screening.id}>
                            <td>{screening.movieId}</td>
                            <td>{screening.availableSeats}</td>
                            <td>{screening.basePrice}</td>
                            <td>{screening.screenId}</td>
                            <td>{new Date(screening.startTime).toLocaleDateString()}</td>
                            <td>{new Date(screening.endTime).toLocaleDateString()}</td>
                            <td className="actions">
                                <button className="edit">Edit</button>
                                <button className="delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="screening-modal-overlay">
                    <div className="screening-modal-content">
                        <h2>Adding a New Screening</h2>
                        <form onSubmit={handleSubmit} className="screening-modal-form">
                            <label>
                                Movie ID:
                                <input
                                    type="text"
                                    name="movieId"
                                    value={newScreening.movieId}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label>
                                Screen ID:
                                <input
                                    type="text"
                                    name="screenId"
                                    value={newScreening.screenId}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label>
                                Start Time:
                                <input
                                    type="datetime-local"
                                    name="startTime"
                                    value={newScreening.startTime}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label>
                                End Time:
                                <input
                                    type="datetime-local"
                                    name="endTime"
                                    value={newScreening.endTime}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label>
                                Base Price:
                                <input
                                    type="number"
                                    name="basePrice"
                                    value={newScreening.basePrice}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <label>
                                Available Seats:
                                <input
                                    type="number"
                                    name="availableSeats"
                                    value={newScreening.availableSeats}
                                    onChange={handleChange}
                                    required
                                />
                            </label>

                            <div className="screening-modal-actions">
                                <button type="submit" className="save-btn">Add Screening</button>
                                <button type="button" className="close-btn" onClick={handleCloseModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminScreenings;