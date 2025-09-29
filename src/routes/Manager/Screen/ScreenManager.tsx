import { useEffect, useState } from 'react';
import './ScreenManager.css';

type Screen = {
    id: number;
    theaterId: number;
    name: string;
    totalSeats: number;
    screenType: string;
    isActive: boolean;
    createdAt: string;
};

type Theater = {
    id: number;
    name: string;
};

function ScreenManager() {
    const [screens, setScreens] = useState<Screen[]>([]);
    const [theaters, setTheaters] = useState<Theater[]>([]);
    const [isModalOpen, setIsModal] = useState(false);
    const [newScreen, setNewScreen] = useState({
        theaterId: '',
        name: '',
        totalSeats: 0,
        screenType: '',
    });

    const handleCloseModal = () => {
        setIsModal(false);
        // Reset form
        setNewScreen({
            theaterId: '',
            name: '',
            totalSeats: 0,
            screenType: '',
        });
    };

    const handleOpenModal = () => {
        setIsModal(true);
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) throw new Error("User is not logged in");
        const fetchScreens = async () => {
            try {
                const response = await fetch("https://localhost:7109/screen/theater",
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch screens");
                }
                const data = await response.json();
                setScreens(data);
            } catch (err: any) {
                console.error("Failed to fetch screens:", err);
            }
        };

        const fetchTheaters = async () => {
            try {
                const response = await fetch("https://localhost:7109/api/theaters");
                if (!response.ok) {
                    throw new Error("Failed to fetch theaters");
                }
                const data = await response.json();
                setTheaters(data);
            } catch (err: any) {
                console.error("Failed to fetch theaters:", err);
            }
        };

        fetchScreens();
        fetchTheaters();
    }, []);

    // Handle Inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewScreen({ ...newScreen, [name]: value });
    };

    // Submit form data
    const handleAddScreen = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newScreen.theaterId || !newScreen.name || !newScreen.totalSeats) {
            alert("Theater, Name, and Total Seats are required!");
            return;
        }

        const payload = {
            theaterId: Number(newScreen.theaterId),
            name: newScreen.name,
            totalSeats: Number(newScreen.totalSeats),
            screenType: newScreen.screenType || 'Standard',
        };

        try {
            const response = await fetch('https://localhost:7109/api/screens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Failed to add screen');

            const addedScreen = await response.json();
            setScreens([...screens, addedScreen]);
            setIsModal(false);

            // Reset form
            setNewScreen({
                theaterId: '',
                name: '',
                totalSeats: 0,
                screenType: '',
            });
        } catch (err) {
            console.error(err);
            alert('Failed to add screen. Please try again.');
        }
    };

    const handleDeleteScreen = async (screenId: number) => {
        if (!confirm('Are you sure you want to delete this screen?')) return;

        // try {
        //  const response = await fetch(`https://localhost:7109/api/screens/${screenId}`, {
        //   method: 'DELETE',
        //  });

        //  if (!response.ok) throw new Error('Failed to delete screen');

        //  setScreens(screens.filter(screen => screen.id !== screenId));
        // } catch (err) {
        //  console.error(err);
        //  alert('Failed to delete screen. Please try again.');
        // }
    };

    const getTheaterName = (theaterId: number) => {
        const theater = theaters.find(t => t.id === theaterId);
        return theater ? theater.name : `Theater ${theaterId}`;
    };

    return (
        <div className="screen-manager-container">
            <div className="screen-manager-header">
                <h1 className="screen-manager-title">Screen Management</h1>
                <button className="add-screen-btn" onClick={handleOpenModal}>
                    Add New Screen
                </button>
            </div>

            <div className="screens-table-wrapper">
                <table className="screens-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Screen Name</th>
                            <th>Total Seats</th>
                            <th>Screen Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {screens.map((screen) => (
                            <tr key={screen.id}>
                                <td>{screen.id}</td>
                                <td>{screen.name}</td>
                                <td>{screen.totalSeats}</td>
                                <td>
                                    <span className={`screen-type ${screen.screenType.toLowerCase()}`}>
                                        {screen.screenType}
                                    </span>
                                </td>
                                <td>
                                    <span className={`status ${screen.isActive ? 'active' : 'inactive'}`}>
                                        {screen.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="table-actions">
                                    <button className="edit-btn">Edit</button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDeleteScreen(screen.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">Add New Screen</h2>
                            <button className="modal-close-btn" onClick={handleCloseModal}>
                                ✕
                            </button>
                        </div>

                        <div className="screen-form">
                            <div className="form-group">
                                <label className="form-label">
                                    Theater: *
                                    <select
                                        name="theaterId"
                                        value={newScreen.theaterId}
                                        onChange={handleInputChange}
                                        className="form-select"
                                        required
                                    >
                                        <option value="">-- Select Theater --</option>
                                        {theaters.map((theater) => (
                                            <option key={theater.id} value={theater.id}>
                                                {theater.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Screen Name: *
                                    <input
                                        type="text"
                                        name="name"
                                        value={newScreen.name}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="e.g. Hall 1, IMAX Screen"
                                        required
                                    />
                                </label>
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Total Seats: *
                                    <input
                                        type="number"
                                        name="totalSeats"
                                        value={newScreen.totalSeats}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="e.g. 220"
                                        min="1"
                                        required
                                    />
                                </label>
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Screen Type:
                                    <select
                                        name="screenType"
                                        value={newScreen.screenType}
                                        onChange={handleInputChange}
                                        className="form-select"
                                    >
                                        <option value="Standard">Standard</option>
                                        <option value="IMAX">IMAX</option>
                                        <option value="4DX">4DX</option>
                                        <option value="VIP">VIP</option>
                                        <option value="Dolby Atmos">Dolby Atmos</option>
                                    </select>
                                </label>
                            </div>

                            <div className="modal-actions">
                                <button type="button" className="save-screen-btn" onClick={handleAddScreen}>
                                    Save Screen
                                </button>
                                <button type="button" className="cancel-screen-btn" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ScreenManager;