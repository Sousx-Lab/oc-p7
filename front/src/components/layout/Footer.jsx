import React, {useContext} from "react";
import {UserContext} from "../../contexts/UserContext";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from '../../assets/img/icon-left-font-monochrome-white.svg';
import { HomeSvg, UserCircleSvg, InfoSvg, CodeSvg } from "../IconsSvg";
const Footer = () => {

    const { user } = useContext(UserContext);
    const date = new Date();

    return (
        <>
            <Outlet />
            <footer className="pt-5 mt-5 text-muted bg-black position-absolute w-100">
                <div className="container text-center">
                    <ul className="list-inline ">
                        <li className="list-inline-item ">
                            <a href={'#accueil'} className="pe-1 text-muted">
                                <i className="pe-1"><HomeSvg size={17} stroke={"#ffff"} /></i>
                                Accueil
                            </a>
                            |
                        </li>
                        <li className="list-inline-item">
                            <Link to={`/user/${user.id}`} className="pe-1 text-muted" >
                                <i className="pe-1"><UserCircleSvg size={16} stroke={"#ffff"} /></i>
                            Profile
                        </Link>
                        |
                        </li>
                        <li className="list-inline-item">
                        <Link to={`/about`} className="pe-1 text-muted">
                                <i className="pe-1"><InfoSvg size={16} stroke={"#ffff"} /></i>
                            A propos
                        </Link>
                        |
                        </li>
                        <li className="list-inline-item">
                            <a href={'http://localhost:3000/api'} className="pe-1 text-muted" target="_blank">
                            <i className="pe-1"><CodeSvg size={16} stroke={"#ffff"} /></i>
                                Api
                            </a>
                        </li>
                    </ul>
                    <div className="row mt-5">
                        <div className="">
                            <Link className="navbar-brand me-0 " to={"/"}>
                                <img src={logo} className="img-responsive" alt="Groupomania logo" width={140} />
                            </Link>
                            <div className="text-muted small d-inline-block ps-2">{date.getFullYear()}</div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;