import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { logout } from "../../services/Api/security/authenticator";
import { toast } from 'react-toastify';
import { useLocation } from "react-router-dom";
import defautlAvatar from '../../assets/img/d-avatar.svg';
import logo from '../../assets/img/icon-left-font-monochrome-white.svg';
import { ArrowOutSvg, UserCircleSvg } from "../IconsSvg";

const Header = () => {
    const { user, setUser } = useContext(UserContext);
    const location = useLocation()
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout(user)
            setUser(null)
            navigate('login', { replace: true })
            toast.info('Vous êtes désormais déconnecté. 👋')
        } catch (error) {
            toast.error("Une erreur s'est produite! Veuillez réessayer plus tard")
        }

    }
    const navLink = () => {
        return 'nav-link ' + (location.pathname === '/' ? 'active' : '')
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
                                        <Link className="dropdown-item" to={`/user/${user.id}`}>
                                            Profile
                                            <div className="d-inline ps-2 float-end">
                                                <UserCircleSvg size={18} />
                                            </div>
                                        </Link>
                                        <a className="dropdown-item bg-danger text-light" onClick={handleLogout} href="#">
                                            Déconnexion
                                            <div className="d-inline ps-2 float-end">
                                                <ArrowOutSvg stroke="#ffff" size={18} />
                                            </div>
                                        </a>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/user/${user.id}`} className="d-none d-md-inline">
                                        <img className="rounded-circle" src={user.profilePicture || defautlAvatar} width={32}
                                            alt={`${user.firstName} ${user.lastName}`}
                                            title={`${user.firstName} ${user.lastName}`}
                                        />
                                    </Link>
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