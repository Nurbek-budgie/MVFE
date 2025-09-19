import MovieGrid from "../../components/MovieGrid/MovieGrid";
import './Movies.css';

function Movies() {
    return (
        <>
        <div className="movies-container">
            <h1>Movies Available Today</h1>
            <hr className="separator-hr-movies" />
            <MovieGrid />
        </div>
        </>
    )
}

export default Movies;