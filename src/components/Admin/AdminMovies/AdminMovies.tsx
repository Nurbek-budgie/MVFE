import { useEffect, useState } from 'react';
import './AdminMovies.css'

type Movie = {
 id: number;
 title: string;
 genre: string;
 director: string;
 duration: number;
 rating: string;
 releaseDate: Date;
 posterUrl: string;
 trailerUrl: string;
 isActive: boolean;
};


function AdminMovies() {
 const [movies, setMovies] = useState<Movie[]>([]);
 const [isModalOpen, setIsModal] = useState(false);
 const [newMovie, setNewMovie] = useState({
  title: '',
  description: '',
  genre: '',
  director: '',
  cast: '',
  duration: 0,
  rating: '',
  releaseDate: '',
  language: '',
  poster: null as File | null,
  trailer: null as File | null,
 });

 const handleCloseModal = () => {
  setIsModal(false);
 };

 const handleOpenModal = () => {
  setIsModal(true);
 };

 useEffect(() => {
  const fetchMovies = async () => {
   try {
    const response = await fetch("https://localhost:7109/api/movies");
    if (!response) {
     throw new Error("Failed to fetch");
    }
    const data = await response.json();
    setMovies(data);
   } catch (err: any) {
    throw new Error("failed to fetch", err);
   }
  }

  fetchMovies();
 }, []);

 // Handle Inputs
 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setNewMovie({ ...newMovie, [name]: value });
 };

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;
  const file = e.target.files[0];
  setNewMovie({ ...newMovie, [e.target.name]: file });
 };

 // submit formdata
 const handleAddMovie = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!newMovie.title || !newMovie.duration) {
   alert("Title and Duration are required!");
   return;
  }

  const formData = new FormData();
  formData.append('title', newMovie.title);
  formData.append('description', newMovie.description);
  formData.append('genre', newMovie.genre);
  formData.append('director', newMovie.director);
  formData.append('cast', newMovie.cast);
  formData.append('duration', newMovie.duration.toString());
  formData.append('rating', newMovie.rating);
  formData.append('releaseDate', newMovie.releaseDate);
  formData.append('language', newMovie.language);

  if (newMovie.poster) formData.append('poster', newMovie.poster);
  if (newMovie.trailer) formData.append('trailer', newMovie.trailer);


  try {
   const response = await fetch('https://localhost:7109/api/createmovie', {
    method: 'POST',
    body: formData,
   });

   if (!response.ok) throw new Error('Failed to add movie');

   const addedMovie = await response.json();
   // Update local state / refresh movie list
   setMovies([...movies, addedMovie]);
   setIsModal(false);
  } catch (err) {
   console.error(err);
  }
 };

 return (
  <div className="adminmovies-container">
   <button onClick={handleOpenModal}>Add Movie</button>
   <table className="adminmovies-table" border={1}>
    <thead>
     <tr>
      <th>Title</th>
      <th>Genre</th>
      <th>Director</th>
      <th>Duration</th>
      <th>Rating</th>
      <th>Release Date</th>
      <th>Active</th>
      <th>Actions</th>
     </tr>
    </thead>
    <tbody>
     {movies.map((movie) => (
      <tr key={movie.id}>
       <td>{movie.title}</td>
       <td>{movie.genre}</td>
       <td>{movie.director}</td>
       <td>{movie.duration} min</td>
       <td>{movie.rating}</td>
       <td>{new Date(movie.releaseDate).toLocaleDateString()}</td>
       <td>{movie.isActive ? "Yes" : "No"}</td>
       <td className="actions">
        <button className="edit">Edit</button>
        <button className="delete">Delete</button>
       </td>
      </tr>
     ))}
    </tbody>
   </table>

   {isModalOpen && (
    <>
     <div className="model-content">
      <div className="model-overlay">
       <h2>Adding a new movie</h2>
       <form action="text" className="model-form">
        <label>
         Title: *
         <input
          type="text"
          name="title"
          value={newMovie.title}
          onChange={handleInputChange}
          required
         />
        </label>
        <label>
         Description
         <input type="text"
          name="description"
          value={newMovie.description}
          onChange={handleInputChange} />
        </label>
        <label>
         Genre:
         <input
          type="text"
          name="genre"
          value={newMovie.genre}
          onChange={handleInputChange}
         />
        </label>

        <label>
         Director:
         <input
          type="text"
          name="director"
          value={newMovie.director}
          onChange={handleInputChange}
         />
        </label>

        <label>
         Cast:
         <input
          type="text"
          name="cast"
          value={newMovie.cast}
          onChange={handleInputChange}
         />
        </label>

        <label>
         Duration (minutes): *
         <input
          type="number"
          name="duration"
          value={newMovie.duration}
          onChange={handleInputChange}
          required
         />
        </label>

        <label>
         Rating:
         <input
          type="text"
          name="rating"
          value={newMovie.rating}
          onChange={handleInputChange}
         />
        </label>

        <label>
         Release Date:
         <input
          type="date"
          name="releaseDate"
          value={newMovie.releaseDate}
          onChange={handleInputChange}
         />
        </label>

        <label>
         Language:
         <input
          type="text"
          name="language"
          value={newMovie.language}
          onChange={handleInputChange}
         />
        </label>

        <label>
         Poster:
         <input type="file" name="poster" onChange={handleFileChange} />
        </label>

        <label>
         Trailer:
         <input type="file" name="trailer" onChange={handleFileChange} />
        </label>

        <div className="modal-buttons">
         <button type="submit" className="save-btn" onClick={handleAddMovie}>Save</button>
         <button type="button" className="close-btn" onClick={handleCloseModal}>Cancel</button>
        </div>
       </form>
      </div>
     </div>
    </>
   )}
  </div>
 );
}

export default AdminMovies;