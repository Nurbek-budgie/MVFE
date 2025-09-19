import TheaterGrid from '../../components/TheaterGrid/TheaterGrid';
import './Cinema.css'

function Cinema() {
    return (
        <>
        <div className="cinema-container">
            <div className="cinema-grid">
                <h1>THEATERS THAT ARE AVAILABLE TO BOOK</h1>
                <hr className="cinema-divider" />
                <TheaterGrid />
            </div>
        </div>
        </>
    )
}

export default Cinema;