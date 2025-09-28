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
import AdminScreenings from './components/Admin/AdminScreenings/AdminScreenings';
import ScreeningManager from './routes/Manager/Screening/ScreeningManager';
import ScreenManager from './routes/Manager/Screen/ScreenManager';
import ManagerLayout from './routes/Manager/ManagerLayout/ManagerLayout';

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
            <Route path="screenings" element={<AdminScreenings />} />
            <Route path="screening/manager" element={<ScreeningManager />} />
            <Route path="screen/manager" element={<ScreenManager />} />
          </Route>
          {/* Manager routes */}
          <Route path="/manager" element={<ManagerLayout />}>
            <Route path="screening/manager" element={<ScreeningManager />} />
            <Route path="screen/manager" element={<ScreenManager />} />
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
