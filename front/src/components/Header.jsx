import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/img/icon-left-font-monochrome-white.svg';
import { Outlet } from "react-router-dom";
import { logout } from "../services/Api/security/authenticator";
import { toast } from 'react-toastify';
import { useLocation } from "react-router-dom";

const Header = () => {
    const { user, setUser } = useContext(UserContext);
    const location = useLocation()
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout(user)
            setUser(null)
            navigate('login', {replace: true})
            toast.info('Vous êtes désormais déconnecté. 👋')
        } catch (error) {
            toast.error("Une erreur s'est produite! Veuillez réessayer plus tard")
        }
       
    }
    const navLink = () => {
        return 'nav-link ' + (location.pathname === '/' ? 'active': '')
    }
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
                    <div className="container">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#mainNav" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="mainNav">
                            <Link className="navbar-brand me-0" to={"/"}>
                                <img src={logo} className="img-responsive" alt="Groupomania logo" width={200} />
                            </Link>
                            <ul className="nav navbar-nav ms-auto justify-content-end">
                                <li className="nav-item">
                                    <Link to={"/"} className={navLink()}>Accueil
                                        <span className="visually-hidden">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-light" data-bs-toggle="dropdown"
                                        href="#" role="button" aria-haspopup="true" aria-expanded="false"><strong>{user?.firstName}</strong> 
                                    </a>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="#">Profile</a>
                                        <a className="dropdown-item bg-danger text-light" onClick={handleLogout} href="#">Logout</a>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <img className="rounded-circle" src={user.profilePicture} width={32} alt="" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <Outlet />
        </>
    )
}

export default Header;