import { useEffect, useState } from 'react';
import './AdminTheater.css';

type Theater = {
 id: number;
 name: string;
 address: string;
 city: string;
 phone: string;
 logoUrl: string;
};

function AdminTheater() {
 const [theaters, setTheaters] = useState<Theater[]>([]);
 const [isModalOpen, setIsModal] = useState(false);
 const [newTheater, setNewTheater] = useState({
  name: '',
  address: '',
  city: '',
  phone: ''
 });

 const handleOpenModal = () => {
  setIsModal(true);
 }

 const handleCloseModal = () => {
  setIsModal(false);
  setNewTheater({
   name: '',
   address: '',
   city: '',
   phone: ''
  });
 }

 useEffect(() => {
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

  fetchTheaters();

 }, [])

 // Handle input changes
 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setNewTheater({ ...newTheater, [name]: value });
 };

 const handleAddTheater = async () => {
  if (!newTheater.name || !newTheater.address || !newTheater.city) {
   alert("Name, Address, and City are required!");
   return;
  }

  const payload = {
   name: newTheater.name,
   address: newTheater.address,
   city: newTheater.city,
   phone: newTheater.phone || '',
  };

  try {
   const response = await fetch('https://localhost:7109/api/theater/add', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
   });

   if (!response.ok) throw new Error('Failed to add theater');

   const addedTheater = await response.json();
   setTheaters([...theaters, addedTheater]);
   handleCloseModal();
  } catch (err) {
   console.error(err);
   alert('Failed to add theater. Please try again.');
  }
 };

 // Handle delete theater
 const handleDeleteTheater = async (theaterId: number) => {
  if (!confirm('Are you sure you want to delete this theater?')) return;

  try {
   const response = await fetch(`https://localhost:7109/api/theaters/${theaterId}`, {
    method: 'DELETE',
   });

   if (!response.ok) throw new Error('Failed to delete theater');

   setTheaters(theaters.filter(theater => theater.id !== theaterId));
  } catch (err) {
   console.error(err);
   alert('Failed to delete theater. Please try again.');
  }
 };

 return (
  <div className="admin-theater-container">
   <div className="admin-theater-header">
    <h1 className="admin-theater-title">Theater Management</h1>
    <button className="add-theater-btn" onClick={handleOpenModal}>
     Add New Theater
    </button>
   </div>

   <div className="theater-table-wrapper">
    <table className="theater-table">
     <thead>
      <tr>
       <th>ID</th>
       <th>Theater Name</th>
       <th>Address</th>
       <th>City</th>
       <th>Phone</th>
       <th>Actions</th>
      </tr>
     </thead>
     <tbody>
      {theaters.length === 0 ? (
       <tr>
        <td colSpan={6} className="no-data">
         No theaters found. Add your first theater!
        </td>
       </tr>
      ) : (
       theaters.map((theater) => (
        <tr key={theater.id}>
         <td>{theater.id}</td>
         <td className="theater-name">{theater.name}</td>
         <td>{theater.address}</td>
         <td>{theater.city}</td>
         <td>{theater.phone || 'N/A'}</td>
         <td className="theater-table-actions">
          <button className="edit-btn">Edit</button>
          <button
           className="delete-btn"
           onClick={() => handleDeleteTheater(theater.id)}
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

   {isModalOpen && (
    <div className="theater-modal-overlay">
     <div className="theater-modal-content">
      <div className="theater-modal-header">
       <h2 className="theater-modal-title">Add New Theater</h2>
       <button className="theater-modal-close-btn" onClick={handleCloseModal}>
        ✕
       </button>
      </div>

      <div className="theater-form">
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
   )}
  </div>
 );
}

export default AdminTheater;