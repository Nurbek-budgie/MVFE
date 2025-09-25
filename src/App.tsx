import './App.css';
import Home from './routes/Home/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetails from './routes/MovieDetails/MovieDetails';
import IMax from './routes/IMax/IMax';
import DolbyVision from './routes/DolbyVision/DolbyVision';
import Movies from './routes/Movies/Movies';
import Cinema from './routes/Cinema/Cinema';
import AdminLayout from './components/Admin/AdminLayout/AdminLayout';
import PublicLayout from './PublicLayout';
import AdminMovies from './components/Admin/AdminMovies/AdminMovies';

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/imax" element={<IMax />} />
            <Route path="/dolbyvision" element={<DolbyVision />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/cinemas" element={<Cinema />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="movies" element={<AdminMovies />} />
            {/* <Route path="screenings" element={<AdminScreenings />} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
