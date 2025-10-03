import React, { useState } from "react";
import './ScreeningButton.css';
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

interface Screening {
  id: number;
  startTime: string;
  basePrice: number;
  movieTitle?: string;
  screenName?: string;
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
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleOpenModal = async () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSeats([]);
  };

  const {data: seats = [], isLoading} = useQuery<Seat[]>({
    queryKey: ['screening-seats'],
    queryFn: async() => {
      const res = await fetch(`https://localhost:7109/api/screenings/${screening.id}/seats`);
      if(!res.ok) throw new Error("failed to fetch");
      const data = await res.json();
      return data.seats;
    },
    enabled: isModalOpen,
  });

  const toggleSeatSelection = (seatId: number) => {
    const seat = seats.find(s => s.seatId === seatId);
    if (seat?.isBooked) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const bookSeatsMutation = useMutation({
    mutationFn: async(seatIds: number[]) => {
      const chosenSeats = seats.filter(s => seatIds.includes(s.seatId));
      const requestBody = {
        screeningId: screening.id,
        seats: chosenSeats.map(s => ({row: s.row, number: s.seatNumber})),
      };

      const res = await fetch('https://localhost:7109/api/reservations', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) throw new Error("failed to reserve");

      return res.json();
    },
    onSuccess: async() => {
      queryClient.invalidateQueries({queryKey: ['screening-seats', screening.id],}),
      handleCloseModal();
    },
    onError: (err) => {
      console.error(err);
      alert("Booking failed. Please try again.");
    }
  }); 

  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) {
      return;
    }
    bookSeatsMutation.mutate(selectedSeats);
  }

  // Group seats by row for cinema-style layout
  const groupedSeats = seats.reduce((acc, seat) => {
    acc[seat.row] = acc[seat.row] || [];
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  // Sort rows alphabetically
  const sortedRows = Object.keys(groupedSeats).sort();

  const getSelectedSeatNames = () => {
    return seats
      .filter(seat => selectedSeats.includes(seat.seatId))
      .map(seat => `${seat.row}${seat.seatNumber}`)
      .join(', ');
  };

  const getTotalPrice = () => {
    return selectedSeats.length * screening.basePrice;
  };

  return (
    <>
      <div className="screening-btn-time" onClick={handleOpenModal}>
        {new Date(screening.startTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>

      {isModalOpen && (
        <div className="cinema-modal-overlay">
          <div className="cinema-modal-container">
            <div className="cinema-modal-header">
              <div className="cinema-modal-title">
                <h2>{screening.movieTitle || 'Movie Screening'}</h2>
                <div className="screening-details">
                  <span className="screening-time">
                    {new Date(screening.startTime).toLocaleDateString()} |
                    {new Date(screening.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="screening-location">
                    {screening.screenName || `Screening ${screening.id}`}
                  </span>
                </div>
              </div>
              <button className="cinema-close-btn" onClick={handleCloseModal}>
                ×
              </button>
            </div>

            {isLoading ? (
              <div className="cinema-loading">
                <div className="loading-spinner"></div>
                <p>Loading seats...</p>
              </div>
            ) : (
              <div className="cinema-content">
                {/* Legend */}
                <div className="seat-legend">
                  <div className="legend-item">
                    <div className="legend-seat available"></div>
                    <span>Available</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-seat occupied"></div>
                    <span>Occupied</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-seat selected"></div>
                    <span>Your seats</span>
                  </div>
                </div>

                {/* Selected seats info */}
                {selectedSeats.length > 0 && (
                  <div className="selected-seats-info">
                    <h3>Your seats: {getSelectedSeatNames()}</h3>
                  </div>
                )}

                {/* Cinema seats layout */}
                <div className="cinema-seats-container">
                  <div className="cinema-seats-grid">
                    {sortedRows.map(row => {
                      // Sort seats by seat number within each row
                      const rowSeats = groupedSeats[row].sort((a, b) =>
                        parseInt(a.seatNumber) - parseInt(b.seatNumber)
                      );

                      return (
                        <div key={row} className="cinema-seat-row">
                          <div className="row-label">{row}</div>
                          <div className="row-seats">
                            {rowSeats.map(seat => {
                              const isSelected = selectedSeats.includes(seat.seatId);
                              return (
                                <button
                                  key={seat.seatId}
                                  className={`cinema-seat ${seat.isBooked
                                    ? "occupied"
                                    : isSelected
                                      ? "selected"
                                      : "available"
                                    }`}
                                  disabled={seat.isBooked}
                                  onClick={() => toggleSeatSelection(seat.seatId)}
                                  title={`Seat ${seat.row}${seat.seatNumber}`}
                                >
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Screen */}
                  <div className="cinema-screen">
                    <div className="screen-curve">SCREEN</div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="cinema-modal-actions">
                  <button className="cinema-btn cancel" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button
                    className={`cinema-btn confirm ${selectedSeats.length === 0 ? 'disabled' : ''}`}
                    onClick={handleConfirmBooking}
                    disabled={selectedSeats.length === 0}
                  >
                    Buy Tickets {selectedSeats.length > 0 && `($${getTotalPrice().toFixed(2)})`}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ScreeningButton;