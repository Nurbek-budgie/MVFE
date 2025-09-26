import { useEffect, useState } from 'react';
import './AdminScreenings.css';

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
 const [screenings, setScreenings] = useState<Screening[]>([]);
 const [isModalOpen, setIsModal] = useState(false);
 const [newScreening, setNewScreening] = useState({
  movieId: '',
  screenId: '',
  startTime: '',
  endTime: '',
  basePrice: '',
  availableSeats: '',
 });

 const handleCloseModal = () => {
  setIsModal(false);
 };

 const handleOpenModal = () => {
  setIsModal(true);
 };

 useEffect(() => {
  const fetchScreenings = async () => {
   try {
    const response = await fetch("https://localhost:7109/screenings");
    if (!response) {
     throw new Error("Failed to fetch");
    }
    const data = await response.json();
    setScreenings(data);
   } catch (err: any) {
    throw new Error("failed to fetch", err);
   }
  }

  fetchScreenings();
 }, []);

 // Handle Inputs
 const handleChange = (e) => {
  const { name, value } = e.target;
  setNewScreening((prev) => ({ ...prev, [name]: value }));
 };



 const handleSubmit = async (e) => {
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
   alert("Please fill in all fields");
   return;
  }

  try {
   const res = await fetch("https://localhost:7109/screening/create", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(newScreening),
   });

   if (!res.ok) {
    throw new Error("Failed to create screening");
   }

   const data = await res.json();
   console.log("✅ Screening created:", data);

   // Optional: show a success message
   alert("Screening added successfully!");

   // ✅ Reset form & close modal
   setNewScreening({
    movieId: '',
    screenId: '',
    startTime: '',
    endTime: '',
    basePrice: '',
    availableSeats: '',
   });
   setIsModal(false);

  } catch (error) {
   console.error("❌ Error creating screening:", error);
   alert("Something went wrong while creating the screening.");
  }
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