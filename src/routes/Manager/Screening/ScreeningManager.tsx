import { useEffect, useState } from 'react';
import './ScreeningManager.css'
import ScreeningButton from '../../../components/ScreeningButton/ScreeningButton';
import AddScreeningModal from '../../../components/AddScreeningModal/AddScreeningModal';

type Movie = {
 id: number;
 title: string;
 description: string;
 duration: number;
 posterUrl: string;
 trailerUrl: string;
 language: string;
 cast: string;
 releaseDate: Date;
 theaters: Theater[];
};

type Theater = {
 id: number;
 theaterName: string;
 screens: Screen[];
};

type Screen = {
 id: number;
 screenName: string;
 screenings: Screening[];
};

type Screening = {
 id: number;
 startTime: string,
 basePrice: number;
};

function ScreeningManager() {
 const [isModalOpen, setModal] = useState(false);
 const id = 5;

 const [movie, setMovie] = useState<Movie | null>(null);

 const handleOpenModal = () => {
  setModal(true);
 }

 const handleCloseModal = () => {
  setModal(false);
 }

 useEffect(() => {
  const fetchMovie = async () => {
   try {
    const responce = await fetch(`https://localhost:7109/api/moviesscre/${id}`);
    if (!responce) {
     throw new Error("Failed to fetch");
    }

    const rawData = await responce.json();

    const data: Movie = {
     ...rawData,
     theaters: rawData.theaters?.map((theater: any) => ({
      ...theater,
      screens: theater.screens?.map((screen: any) => ({
       ...screen,
       screenings: screen.screenings?.map((screening: any) => ({
        id: screening.id,
        startTime: screening.startTime,
        basePrice: screening.basePrice
       }))
      }))
     }))
    };

    setMovie(data);
   } catch (error: any) {
    console.log(error)
   }
  }

  fetchMovie();
 }, [id]);

 return (
  <>
   <div className="manager-screening-container">
    <button className="add-new-screening-btn" onClick={handleOpenModal}>Add a new Movie Screening</button>
    <div className="movie-detail-screenings">
     {movie?.theaters?.map((theater) => (
      <div key={theater.id} className="theater-wrapper">
       <div className="movie-detail-theater">
        <h3>{theater.theaterName}</h3>
       </div>
       <div className="movie-detail-screen">
        {theater.screens?.map((screen) => (
         <div className="screen-wrapper">
          <div key={screen.id} className="movie-detail-screen-det">
           <h4>{screen.screenName}</h4>
          </div>
          <div className="movie-detail-screening">
           {screen.screenings?.map((screening) => (
            <ScreeningButton key={screening.id} screening={screening} />
           ))}
          </div>
         </div>
        ))}
       </div>
      </div>
     ))}
    </div>

    {isModalOpen && (
     <div className="screeningManager-modal-overlay">
      <div className="screeningMangaer-modal-content">
       <AddScreeningModal />
       <button onClick={handleCloseModal}>closeddddd</button>
      </div>
     </div>
    )}
   </div>
  </>
 )
}

export default ScreeningManager;