import { useState, useEffect } from 'react';
import './AdminUser.css'

type Manager = {
    id: string,
    userName: string,
    email: string,
    theaterId?: number,
};


function AdminUser() {
    const [isModalOpen, setModal] = useState(false);
    const [managers, setManagers] = useState<Manager[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleOpenModal = () => {
        setModal(true);
    }

    const handleCloseModal = () => {
        setModal(false);
    }

    useEffect(() => {
        const fetchManagers = async () => {
            try {
                const token = localStorage.getItem("accessToken"); // stored from login
                const res = await fetch("https://localhost:7109/managers", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!res.ok) throw new Error("Failed to fetch managers");

                const data: Manager[] = await res.json();
                setManagers(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchManagers();
    }, []);

    if (loading) return <p>Loading managers...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="admin-user-container">
            <div className="admin-user-header">
                <h1 className="admin-user-title">User Management</h1>
                <button className="add-user-btn" onClick={handleOpenModal}>
                    Add New User
                </button>
            </div>

            <div className="user-table-wrapper">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>UserName</th>
                            <th>Email</th>
                            <th>TheaterId</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {managers.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="no-data">
                                    No theaters found. Add your first theater!
                                </td>
                            </tr>
                        ) : (
                            managers.map((manager) => (
                                <tr key={manager.id}>
                                    <td>{manager.id}</td>
                                    <td className="user-name">{manager.userName}</td>
                                    <td>{manager.email}</td>
                                    <td>{manager.theaterId}</td>
                                    <td className="user-table-actions">
                                        <button className="edit-btn">Edit</button>
                                        <button
                                            className="delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* {isModalOpen && (
                <div className="user-modal-overlay">
                    <div className="user-modal-content">
                        <div className="user-modal-header">
                            <h2 className="user-modal-title">Add New User</h2>
                            <button className="user-modal-close-btn" onClick={handleCloseModal}>
                                ✕
                            </button>
                        </div>

                        <div className="user-form">
                            <div className="theater-form-group">
                                <label className="form-label">
                                    Theater Name: *
                                    <input
                                        type="text"
                                        name="name"
                                        value={newTheater.name}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="e.g. Galaxy Cinema"
                                        required
                                    />
                                </label>
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Address: *
                                    <input
                                        type="text"
                                        name="address"
                                        value={newTheater.address}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="e.g. 123 Main Street"
                                        required
                                    />
                                </label>
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    City: *
                                    <input
                                        type="text"
                                        name="city"
                                        value={newTheater.city}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="e.g. New York"
                                        required
                                    />
                                </label>
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Phone Number:
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={newTheater.phone}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        placeholder="0(555)111222333"
                                    />
                                </label>
                            </div>

                            <div className="modal-actions">
                                <button className="save-theater-btn" onClick={handleAddTheater}>
                                    Save Theater
                                </button>
                                <button className="cancel-theater-btn" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
}

export default AdminUser;