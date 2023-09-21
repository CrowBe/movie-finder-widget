import logo from "../assets/Logo@2x.png";
import tmdbLogo from "../assets/tmdb_logo.svg";

const LogoHeader = () => {
    // Structure the divs for styling the logo
    return (
        <header>
            <div id="logo-header-div">
                <img
                    src={logo}
                    alt="Play button with magnifying glass and the words the movie finder widget"
                />
                <img
                    src={tmdbLogo}
                    alt="words - The Movie Database in green and blue"
                />
            </div>
        </header>
    );
};

export default LogoHeader;
