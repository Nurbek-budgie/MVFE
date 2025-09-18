import MovieGrid from '../../components/MovieGrid/MovieGrid';
import TrailerSlider from '../../components/TrailerSlider/TrailerSlider';
import './Home.css'

function Home() {
    return (
        <div className="container">
            <TrailerSlider />
            <MovieGrid />
        </div>
    )
}

export default Home;