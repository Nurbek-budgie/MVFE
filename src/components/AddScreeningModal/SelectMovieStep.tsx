import { useEffect, useState } from "react";
import './AddScreeningModal.css';

type Movie = {
 id: number;
 title: string;
 posterUrl: string;
};

type Props = {
 onNext: (movie: Movie) => void;
 onCancel: () => void;
};

export default function SelectMovieStep({ onNext, onCancel }: Props) {
 const [movies, setMovies] = useState<Movie[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchMovies = async () => {
   try {
    const response = await fetch("https://localhost:7109/api/movies");
    if (!response.ok) {
     throw new Error(`Failed to fetch movies (${response.status})`);
    }
    const data: Movie[] = await response.json();
    setMovies(data);
   } catch (err: any) {
    setError(err.message || "Something went wrong");
   } finally {
    setLoading(false);
   }
  };
  fetchMovies();
 }, []);

 if (loading) {
  return (
   <div className="movie-selection-container">
    <div className="loading-message">Loading movies...</div>
   </div>
  );
 }

 if (error) {
  return (
   <div className="movie-selection-container">
    <div className="error-message">
     <span className="error-text">Error: {error}</span>
     <button className="error-close-btn" onClick={onCancel}>
      Close
     </button>
    </div>
   </div>
  );
 }

 return (
  <div className="movie-selection-container">
   <div className="movie-selection-header">
    <h2 className="movie-selection-title">Select a Movie</h2>
   </div>

   <div className="movie-list-wrapper">
    {movies.map((movie) => (
     <div
      key={movie.id}
      className="movie-item"
      onClick={() => onNext(movie)}
     >
      <div className="movie-item-content">
       <div className="movie-poster-wrapper">
        <img
         src={`https://localhost:7109${movie.posterUrl}`}
         alt={movie.title}
         className="movie-poster"
        />
       </div>
       <div className="movie-info">
        <span className="movie-title">{movie.title}</span>
       </div>
      </div>
     </div>
    ))}
   </div>

   <div className="movie-selection-actions">
    <button className="cancel-selection-btn" onClick={onCancel}>
     Cancel
    </button>
   </div>
  </div>
 );
}