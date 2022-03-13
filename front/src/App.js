import React, { useState } from "react";
import  ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LoginPage from "./pages/LoginPage";
import  HomePage from "./pages/HomePage";
import { UserContext } from "./contexts/UserContext";
import { ToastContainer } from 'react-toastify';
import Header from "./components/Header";
import 'react-toastify/dist/ReactToastify.css';
import './assets/scss/app.scss';
import { loadUser } from "./hooks/loadUser";

function App(){
    
    // const [user, setUser, isLoading] = loadUser();
    const [user, setUser] = useState(true)
    // if(isLoading){
    //   return (
    //     <div className="row text-center justify-content-center h-100">
    //       <div className="col-6 align-self-center">
    //         <div className="spinner-border text-primary" style={{width: 3+'rem', height: 3+'rem'}} role="status"></div>
    //         <div className="sr-only"><strong>Loading...</strong></div>
    //         </div>
    //     </div>
    //   )
    // }
    return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter >
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
            <Route element={<ProtectedRoutes />} >
              <Route element={<Header />} >
                <Route index path="/" element={<HomePage/>} />
              </Route>
            </Route>
          </Routes>
      <ToastContainer 
        position="bottom-left"
          autoClose={5000}
            hideProgressBar={false}
              newestOnTop
                closeOnClick
                  rtl={false}
                pauseOnVisibilityChange
              draggable
            pauseOnHover
          />
        </BrowserRouter>
    </UserContext.Provider>
    )
}
ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('app')
);
  
