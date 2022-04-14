import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from '../../assets/img/icon-left-font-monochrome-white.svg';
const Footer = () => {
    return (
        <>
            <Outlet />
            <footer className="pt-5 pb-5 mt-5 text-muted bg-black">
                <div className="container">
                    <div className="row">
                        <div className="w-100">
                            <div className="text-center">
                            <Link className="navbar-brand me-0" to={"/"}>
                                <img src={logo} className="img-responsive" alt="Groupomania logo" width={200} />
                            </Link>
                            </div>
                            <div className="copyright"></div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;