import './Header.css'

function Header() {
    return (
        <header className='header'>
            <nav>
                <a href="/">Home</a>
                <a href="/imax">IMax</a>
                <a href="/dolbyvision">DolbyVision</a>
                <a href="/movies">Movies</a>
                <a href="/movies">Cinemas</a>
            </nav>
        </header>
    )
}

export default Header;