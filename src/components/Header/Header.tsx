import './Header.css'

function Header() {
    // const userName = localStorage.getItem('userName');
    return (
        <header className='header'>
            <div className="nav-left"></div>

            <nav>
                <a href="/">Home</a>
                <a href="/imax">IMax</a>
                <a href="/dolbyvision">DolbyVision</a>
                <a href="/movies">Movies</a>
                <a href="/cinemas">Cinemas</a>
            </nav>
            <div className="nav-right">
                {false ? (
                    <>
                        <a href="/logout">Logout</a>
                    </>
                ) : (
                    <a href="/login">Login</a>
                )}
            </div>
        </header>
    )
}

export default Header;