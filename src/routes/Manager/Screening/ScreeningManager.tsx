import { useEffect, useState } from 'react';
import './ScreeningManager.css'
import ScreeningButton from '../../../components/ScreeningButton/ScreeningButton';
import AddScreeningModal from '../../../components/AddScreeningModal/AddScreeningModal';

type Showtime = {
 showtimeId: number;
 startTime: string;
 basePrice: number;
};

type Movie = {
 movieId: number;
 movieTitle: string;
 showtimes: Showtime[];
};

type Screen = {
 screenId: number;
 screenName: string;
 movies: Movie[];
};

function ScreeningManager() {
 const [isModalOpen, setModal] = useState(false);
 const [screens, setScreens] = useState<Screen[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);
 const id = 3;

 const handleOpenModal = () => {
  setModal(true);
 }

 const handleCloseModal = () => {
  setModal(false);
 }

 useEffect(() => {
  const fetchScreens = async () => {
   try {
    setLoading(true);
    setError(null);

    const response = await fetch(`https://localhost:7109/screen/theatershowtimd?theaterId=${id}`);

    if (!response.ok) {
     throw new Error(`Failed to fetch screenings: ${response.status}`);
    }

    const data: Screen[] = await response.json();
    setScreens(data);
   } catch (error: any) {
    console.error("Error fetching screenings:", error);
    setError(error.message || "Failed to fetch screenings");
   } finally {
    setLoading(false);
   }
  }

  fetchScreens();
 }, [id]);

 return (
  <div className="manager-screening-container">
   <div className="screening-manager-header">
    <h1 className="screening-manager-title">Screening Management</h1>
    <button className="add-new-screening-btn" onClick={handleOpenModal}>
     Add a new Movie Screening
    </button>
   </div>

   <div className="screening-mgr-screenings-list">
    {screens.length === 0 ? (
     <div className="screening-mgr-no-screenings">
      <p>No screenings found for this theater.</p>
      <p>Click "Add a new Movie Screening" to get started.</p>
     </div>
    ) : (
     screens.map((screen) => (
      <div key={screen.screenId} className="screening-mgr-screen-card">
       <div className="screening-mgr-screen-header">
        <h2 className="screening-mgr-screen-name">{screen.screenName}</h2>
       </div>

       <div className="screening-mgr-screen-movies">
        {screen.movies.length === 0 ? (
         <div className="screening-mgr-no-movies">
          No movies scheduled for this screen
         </div>
        ) : (
         screen.movies.map((movie) => (
          <div key={movie.movieId} className="screening-mgr-movie-section">
           <div className="screening-mgr-movie-header">
            <h3 className="screening-mgr-movie-title">{movie.movieTitle}</h3>
           </div>

           <div className="screening-mgr-movie-showtimes">
            {movie.showtimes.length === 0 ? (
             <div className="screening-mgr-no-showtimes">
              No showtimes available
             </div>
            ) : (
             movie.showtimes.map((showtime) => (
              <ScreeningButton
               key={showtime.showtimeId}
               screening={{
                id: showtime.showtimeId,
                startTime: showtime.startTime,
                basePrice: showtime.basePrice,
                movieTitle: movie.movieTitle,
                screenName: screen.screenName
               }}
              />
             ))
            )}
           </div>
          </div>
         ))
        )}
       </div>
      </div>
     ))
    )}
   </div>

   {isModalOpen && (
    <div className="screening-manager-modal-overlay">
     <div className="screening-manager-modal-content">
      <AddScreeningModal
       onClose={handleCloseModal}
      // onScreeningAdded={handleScreeningAdded}
      />
     </div>
    </div>
   )}
  </div>
 );
}

export default ScreeningManager;