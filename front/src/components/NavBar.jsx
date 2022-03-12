import React, {useContext} from "react";
import { UserContext } from "../assets/contexts/UserContext";
import { Link } from "react-router-dom";
import logo from '../assets/img/icon-left-font-monochrome-white.svg'
const NavBar = () => {
    const { user } = useContext(UserContext);

    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mainNav">
                        <Link className="navbar-brand me-0" to={"/"}>
                            <img src={logo} className="img-responsive" alt="Groupomania logo" width={200}/>
                        </Link>
                        <ul className="nav navbar-nav ms-auto justify-content-end">
                            <li className="nav-item">
                                <Link to={"/"} className="nav-link">Accueil
                                <span className="visually-hidden">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-light" data-bs-toggle="dropdown" 
                                    href="#" role="button" aria-haspopup="true" aria-expanded="false">{user.firstName}
                                </a>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">Profile</a>
                                    <a className="dropdown-item bg-danger text-light" href="#">Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default NavBar;