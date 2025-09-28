import { useState, useEffect } from "react";
import './AddScreeningModal.css'

type Movie = {
 id: number;
 title: string;
};

type Screen = {
 id: number;
 name: string;
};

type Props = {
 movie: Movie;
 onBack: () => void;
 onSave: (payload: any) => void;
};

export default function SelectScreenTimeStep({ movie, onBack, onSave }: Props) {
 const [screens, setScreens] = useState<Screen[]>([]);
 const [screenId, setScreenId] = useState<number | "">("");
 const [startTime, setStartTime] = useState("");
 const [endTime, setEndTime] = useState("");
 const [basePrice, setBasePrice] = useState<number | "">("");
 const [availableSeats, setAvailableSeats] = useState<number | "">("");

 // Fetch available screens
 useEffect(() => {
  const fetchScreens = async () => {
   try {
    const res = await fetch("https://localhost:7109/api/screens");
    if (!res.ok) throw new Error("Failed to fetch screens");
    const data: Screen[] = await res.json();
    setScreens(data);
   } catch (err) {
    console.error(err);
   }
  };
  fetchScreens();
 }, []);

 const handleSubmit = () => {
  if (!screenId || !startTime || !endTime) {
   alert("Please fill all required fields.");
   return;
  }

  const payload = {
   movieId: movie.id,
   screenId: Number(screenId),
   startTime,
   endTime,
   basePrice: Number(basePrice) || 0,
   availableSeats: Number(availableSeats) || 0,
  };

  onSave(payload);
 };

 return (
  <div className="screening-schedule-container">
   <div className="screening-schedule-header">
    <h2 className="screening-schedule-title">
     Schedule: <span className="selected-movie-title">"{movie.title}"</span>
    </h2>
   </div>

   <div className="screening-form-wrapper">
    <div className="form-group">
     <label className="form-label">Choose Screen:</label>
     <select
      className="form-select"
      value={screenId}
      onChange={(e) => setScreenId(Number(e.target.value))}
     >
      <option value="">-- Select Screen --</option>
      {screens.map((screen) => (
       <option key={screen.id} value={screen.id}>
        {screen.name}
       </option>
      ))}
     </select>
    </div>

    <div className="form-group">
     <label className="form-label">Start Time:</label>
     <input
      type="datetime-local"
      className="form-input"
      value={startTime}
      onChange={(e) => setStartTime(e.target.value)}
     />
    </div>

    <div className="form-group">
     <label className="form-label">End Time:</label>
     <input
      type="datetime-local"
      className="form-input"
      value={endTime}
      onChange={(e) => setEndTime(e.target.value)}
     />
    </div>

    <div className="form-group">
     <label className="form-label">Base Ticket Price:</label>
     <input
      type="number"
      className="form-input"
      placeholder="e.g. 12.50"
      value={basePrice}
      onChange={(e) => setBasePrice(Number(e.target.value))}
     />
    </div>

    <div className="form-group">
     <label className="form-label">Available Seats:</label>
     <input
      type="number"
      className="form-input"
      placeholder="e.g. 150"
      value={availableSeats}
      onChange={(e) => setAvailableSeats(Number(e.target.value))}
     />
    </div>
   </div>

   <div className="screening-form-actions">
    <button className="back-to-movies-btn" onClick={onBack}>
     Back
    </button>
    <button className="save-screening-btn" onClick={handleSubmit}>
     Save Screening
    </button>
   </div>
  </div>
 );
}
