import React from "react";
import { Outlet } from "react-router-dom";

const AuthSideScreen = () => {
    return(
        <div className='container-fluid vh-100 p-0'>
            <div className='d-flex col-12 m-0'>
                <div className='d-none d-lg-block col-lg-7 p-0 h-100'>
                <img className='vh-100' src="https://source.unsplash.com/random/1650×1080/?nature" async width="100%" height="auto" alt="Groupomania" />
            </div>
            <Outlet />
        </div>
    </div>
    )
};

export default AuthSideScreen;