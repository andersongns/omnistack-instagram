import React from 'react';
import { Link } from 'react-router-dom'
import './index.css';
import Logo from '../../assets/logo.svg'
import Camera from '../../assets/camera.svg'
const Header = () => {
    return (
        <header id="main-header">
            <div className="header-content">
                <Link to="/">
                    <img src={Logo} alt="Logo" />
                </Link>
                <Link to="/new">
                    <img src={Camera} alt="Cam" />
                </Link>
            </div>
        </header>
    )
}

export default Header;