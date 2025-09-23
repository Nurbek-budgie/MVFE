import React, { useState } from "react";
import './ScreeningButton.css';

interface Screening {
 id: string;
 startTime: string;
 basePrice: number;
}

interface ScreeningButtonProps {
 screening: Screening;
}

const ScreeningButton: React.FC<ScreeningButtonProps> = ({ screening }) => {
 const [isModalOpen, setIsModalOpen] = useState(false);

 const handleOpenModal = () => setIsModalOpen(true);
 const handleCloseModal = () => setIsModalOpen(false);

 return (
  <>
   <div className="movie-detail-screening-btn" onClick={handleOpenModal}>
    {new Date(screening.startTime).toLocaleTimeString([], {
     hour: "2-digit",
     minute: "2-digit",
    })}
   </div>

   {isModalOpen && (
    <div className="modal-overlay" onClick={handleCloseModal}>
     <div className="modal-content">
      <h2>Book Seats for Screening {screening.id}</h2>
      <p>Time: {new Date(screening.startTime).toLocaleTimeString()}</p>
      <p>Base Price: ${screening.basePrice.toFixed(2)}</p>

      {/* Example seat selection grid */}
      <div className="seats-grid">
       {[...Array(30)].map((_, index) => (
        <button key={index} className="seat-btn">
         {index + 1}
        </button>
       ))}
      </div>

      <button onClick={handleCloseModal}>Close</button>
     </div>

     <style jsx>{`
            .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.5);
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .modal-content {
              background: white;
              padding: 2rem;
              border-radius: 10px;
              max-width: 500px;
              width: 100%;
              color: black;
            }
            .seats-grid {
              display: grid;
              grid-template-columns: repeat(6, 1fr);
              gap: 10px;
              margin: 1rem 0;
            }
            .seat-btn {
              padding: 10px;
              background: #eee;
              border: 1px solid #ccc;
              border-radius: 5px;
              cursor: pointer;
            }
            .seat-btn:hover {
              background: #ccc;
            }
          `}</style>
    </div>
   )}
  </>
 )
}

export default ScreeningButton;
