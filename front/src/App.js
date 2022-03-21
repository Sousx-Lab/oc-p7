import React from "react";
import  ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { routes } from "./config/routes/routes.config";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import  HomePage from "./pages/HomePage";
import { UserContext } from "./contexts/UserContext";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import AuthSideScreen from "./components/AuthSideScreen";
import PasswordForgotdPage from "./pages/PasswordForgotPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import Loader from "./components/Loader";
import { QueryClient, QueryClientProvider } from "react-query"
import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/app.scss";
import { loadUser } from "./hooks/loadUser";

function App(){

    // const [user, setUser] = useState(true)
    // const isLoading = true
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
  
