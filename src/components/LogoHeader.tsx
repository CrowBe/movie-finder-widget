import React from 'react';
import logo from '../assets/Logo@2x.png'

const LogoHeader = () => {
    // Structure the divs for styling the logo
    return (
        <div id="logo-header-div">
            <div>
                <img src={logo} alt="Play button with magnifying glass and the words the movie finder widget"/>
            </div>
        </div>
    )
};

export default LogoHeader;