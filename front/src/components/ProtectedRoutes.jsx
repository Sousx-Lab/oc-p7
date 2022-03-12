import React, {useContext, useState} from 'react';
import {UserContext } from '../assets/contexts/UserContext';
import { Outlet, Navigate} from 'react-router-dom';
import NavBar from './NavBar';

const ProtectedRoutes = ({ children, redirectPath = "login"}) => {

    const { user } = useContext(UserContext)
    if(!user){
        return <Navigate to={redirectPath} replace />
    }
    return (
        <>
        <NavBar />
            {children ? children: <Outlet/>}
        </>
        )
        
}

export default ProtectedRoutes;