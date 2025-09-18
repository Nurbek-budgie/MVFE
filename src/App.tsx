import './App.css';
import Header from './components/Header/Header';
import Home from './routes/Home/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import bgImg from './assets/anime-style-clouds.jpg';
import MovieDetails from './routes/MovieDetails/MovieDetails';
import IMax from './routes/IMax/IMax';

function App() {
  return (
    <div className='app'
      style={ { backgroundImage: `url(${bgImg}` } }>
      <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={ <MovieDetails />} />
        <Route path="/imax" element={<IMax />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
