import React from "react";
import  ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { routes } from "./config/routes/routes.config";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Header from "./components/layout/Header";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import UserPage from "./pages/UserPage";
import Footer from "./components/layout/Footer";
import { UserContext } from "./contexts/UserContext";
import { ToastContainer } from "react-toastify";
import AuthSideScreen from "./components/layout/AuthSideScreen";
import PasswordForgotdPage from "./pages/PasswordForgotPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import Loader from "./components/layout/Loader";
import { QueryClient, QueryClientProvider } from "react-query"
import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/app.scss";
import "viewerjs/dist/viewer.css";
import { loadUser } from "./hooks/loadUser";

function App(){

    const [user, setUser, isLoading] = loadUser();
    const queryClient = new QueryClient();
    
    if(isLoading){
      return (
        <Loader text="Loading..." />
      )
    }
    return (
    <UserContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter >
          <Routes>
            <Route element={<AuthSideScreen />} >
              <Route path={routes.login} element={<LoginPage />}/>
              <Route path={routes.signup} element={<SignUpPage />} />
              <Route path={routes.passwordForgot} element={<PasswordForgotdPage />} />
              <Route path={routes.passwordReset} element={<PasswordResetPage />} />
            </Route>
            <Route element={<ProtectedRoutes />} >
              <Route element={<Header />} >
                <Route element={<Footer />} >
                <Route index path={routes.home} element={<HomePage/>}/>
                <Route path={routes.post} element={<PostPage/>}/>
                <Route path={routes.user} element={<UserPage/>}/>
                </Route>
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
  
