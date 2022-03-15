import React, { useState } from "react";
import  ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import  HomePage from "./pages/HomePage";
import { UserContext } from "./contexts/UserContext";
import { ToastContainer } from 'react-toastify';
import Header from "./components/Header";
import AuthSideScreen from './components/AuthSideScreen';
import FullScreenLoader from './components/FullScreenLoader';
import { QueryClient, QueryClientProvider } from 'react-query'
import 'react-toastify/dist/ReactToastify.css';
import './assets/scss/app.scss';
import { loadUser } from "./hooks/loadUser";

function App(){

    // const [user, setUser] = useState(true)
    // const isLoading = true
    const [user, setUser, isLoading] = loadUser();
    const queryClient = new QueryClient();
    
    if(isLoading){
      return (
        <FullScreenLoader />
      )
    }
    return (
    <UserContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter >
          <Routes>
            <Route element={<AuthSideScreen />} >
              <Route path="/login" element={<LoginPage />}/>
              <Route path="/signup" element={<SignUpPage />} />
            </Route>
            <Route element={<ProtectedRoutes />} >
              <Route element={<Header />} >
                <Route index path="/" element={<HomePage/>} />
              </Route>
            </Route>
          </Routes>
          <ToastContainer 
            position="top-right"
              autoClose={5000}
                hideProgressBar={false}
                  newestOnTop={false}
                    closeOnClick
                      rtl={false}
                    pauseOnVisibilityChange
                  draggable
                pauseOnHover
              />
        </BrowserRouter>
      </QueryClientProvider>
    </UserContext.Provider>
    )
}
ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('app')
);
  
