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
import ScreeningManager from './routes/Manager/Screening/ScreeningManager';
import ScreenManager from './routes/Manager/Screen/ScreenManager';
import ManagerLayout from './routes/Manager/ManagerLayout/ManagerLayout';
import AdminTheater from './components/Admin/AdminTheater/AdminTheater';
import Login from './routes/Login/Login';
import AdminUser from './components/Admin/AdminUser/AdminUser';

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

          <Route path="/login" element={<Login />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="theater" element={<AdminTheater />} />
            <Route path="movies" element={<AdminMovies />} />
            <Route path="users" element={<AdminUser />} />
          </Route>
          {/* Manager routes */}
          <Route path="/manager" element={<ManagerLayout />}>
            <Route path="screening" element={<ScreeningManager />} />
            <Route path="screen" element={<ScreenManager />} />
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
