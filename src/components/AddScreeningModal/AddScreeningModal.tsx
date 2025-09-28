import { useState } from "react";
import './AddScreeningModal.css'
import SelectMovieStep from "./SelectMovieStep";
import SelectScreenTimeStep from "./SelectScreenTimeStep";

type Movie = {
 id: number;
 title: string;
 posterUrl?: string;
};

type AddScreeningModalProps = {
 onClose: () => void;
};

export default function AddScreeningModal({ onClose }: AddScreeningModalProps) {
 const [step, setStep] = useState(1);
 const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const handleNext = (movie: Movie) => {
  setSelectedMovie(movie);
  setStep(2);
 };

 const handleSave = async (details: any) => {
  if (!selectedMovie) return;

  const payload = { movieId: selectedMovie.id, ...details };

  try {
   setLoading(true);
   setError(null);

   const response = await fetch("https://localhost:7109/api/screenings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
   });

   if (!response.ok) {
    throw new Error(`Failed to create screening (${response.status})`);
   }

   console.log("✅ Screening created successfully!");
   onClose();
  } catch (err: any) {
   console.error(err);
   setError(err.message || "Something went wrong while creating screening.");
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="add-screening-modal-overlay">
   <div className="add-screening-modal-content">
    <button className="modal-close-btn" onClick={onClose}>
     ✕
    </button>

    {error && (
     <div className="screening-error-banner">
      <span className="error-text">{error}</span>
     </div>
    )}

    <div className="modal-step-wrapper">
     {step === 1 && (
      <SelectMovieStep onNext={handleNext} onCancel={onClose} />
     )}

     {step === 2 && selectedMovie && (
      <SelectScreenTimeStep
       movie={selectedMovie}
       onBack={() => setStep(1)}
       onSave={handleSave}
      />
     )}
    </div>

    {loading && (
     <div className="modal-loading-overlay">
      <div className="loading-spinner"></div>
     </div>
    )}
   </div>
  </div>
 );
}
