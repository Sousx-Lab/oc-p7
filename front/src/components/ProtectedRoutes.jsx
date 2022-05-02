import {useContext} from 'react';
import { UserContext } from '../contexts/UserContext';
import { Outlet, Navigate} from 'react-router-dom';

const ProtectedRoutes = ({ children, redirectPath = "login"}) => {

    const { user } = useContext(UserContext)
    
    if(!user){
        document.getElementById('app').classList.remove('with-footer')
        return <Navigate to={redirectPath} replace />
    }
    return (
        <>
        {children ? children: <Outlet/>}
        </>
    )
        
}

export default ProtectedRoutes;