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

interface Seat {
  seatId: number;
  row: string;
  seatNumber: string;
  seatName: string;
  isBooked: boolean;
}

const ScreeningButton: React.FC<ScreeningButtonProps> = ({ screening }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // const handleOpenModal = () => {
  //   fetchSeats();
  //   setIsModalOpen(true);
  // }

  const handleOpenModal = async () => {
    setIsModalOpen(true);
    await fetchSeats();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSeats([]);
  };

  // Handle seats and selectedseats
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);


  // const handleConfirmBooking = () => {
  //   console.log("Booking confirmed for screening:", screening.id);
  //   console.log("Selected seats:", selectedSeats);
  //   alert(`You booked seats: ${selectedSeats.join(", ")}`);
  //   handleCloseModal();
  // };

  const fetchSeats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://localhost:7109/screening/seats/${screening.id}`);
      if (!res.ok) throw new Error("Failed to load seats");
      const data = await res.json();

      setSeats(data.seats);
    } catch (err) {
      console.error(err);
      alert("Failed to load seats. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const toggleSeatSelection = (seatId: number) => {
    const seat = seats.find(s => s.seatId == seatId);
    if (seat?.isBooked) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]);
  };

  // ✅ Book selected seats TODO TODO TODO !!!!!!!!!!!!
  const handleConfirmBooking = async () => {
    if (selectedSeats.length === 0) return;

    const chosenSeats = seats.filter((s) => selectedSeats.includes(s.seatId));

    const requestBody = {
      screeningId: parseInt(screening.id),
      seats: chosenSeats.map((s) => ({
        row: s.row,
        number: s.seatNumber,
      })),
    }

    try {
      const res = await fetch("https://localhost:7109/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) throw new Error("Reservation failed");

      handleCloseModal();

    } catch (error) {
      console.error(error);
      alert("❌ Booking failed. Please try again.");
    }

  };

  // ✅ Group seats by row for nicer rendering
  const groupedSeats = seats.reduce((acc, seat) => {
    acc[seat.row] = acc[seat.row] || [];
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  return (
    <>
      <div className="movie-detail-screening-btn" onClick={handleOpenModal}>
        {new Date(screening.startTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Book Seats for Screening {screening.id}</h2>
            <p>Time: {new Date(screening.startTime).toLocaleTimeString()}</p>
            <p>Base Price: ${screening.basePrice.toFixed(2)}</p>

            {/* Example seat selection grid */}
            {loading ?
              (<p>Loading...</p>)
              :
              (
                <>
                  <div className="seat-layout">
                    {Object.keys(groupedSeats).map(row => (
                      <div key={row} className="seat-row">
                        <span className="row-label">{row}</span>
                        {groupedSeats[row].map(seat => {
                          const isSelected = selectedSeats.includes(seat.seatId);
                          return (
                            <button
                              key={seat.seatId}
                              className={`seat-btn ${seat.isBooked
                                ? "booked"
                                : isSelected
                                  ? "selected"
                                  : "available"
                                }`}
                              disabled={seat.isBooked}
                              onClick={() => toggleSeatSelection(seat.seatId)}
                            >
                              {seat.seatNumber}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  <div className="modal-actions">
                    <button onClick={handleCloseModal}>Cancel</button>
                    <button
                      onClick={handleConfirmBooking}
                      disabled={selectedSeats.length === 0}
                    >
                      Confirm Booking
                    </button>
                  </div>
                </>
              )
            }


          </div>
        </div>
      )}
    </>
  )
}

export default ScreeningButton;
