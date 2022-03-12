import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../assets/contexts/UserContext';
import logo from '../assets/img/icon-top-font-monochrome-red.svg'
import { Link } from 'react-router-dom';
import { login }  from '../services/Api/security/authenticator';
import { toast } from 'react-toastify';

const LoginPage = () => {

    let {user, setUser} = useContext(UserContext);
    
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget
        setCredentials({...credentials, [name]: value})
    }

    const [error, setError] = useState('');
    let navigate = useNavigate()
    /**
     * @param {Event} event 
     */
    const handleSubmit = async event => {
        event.preventDefault()

        const { user, error } = await login(credentials)
        if (error) {
            setError(error.message)
            toast.error(error.message);
            return;
        }
        setUser(user);
        navigate('/', { replace: true })
        toast.success(`Bonjour ${user.firstName} 🤗`)
    }
    
    useEffect(() => {
        document.title = "Groupomania Login"
    }, []);
    return (
        <div className='container-fluid vh-100 p-0'>
            <div className='d-flex col-12 m-0'>
                <div className='d-none d-lg-block col-lg-7 p-0 '>
                <img className='vh-100' src="https://source.unsplash.com/random/1650×1080/?nature" width="100%" height="auto" alt="Groupomania" />
            </div>
            <div className='d-flex flex-column mx-auto col-md-8 col-lg-5 mt-5 '>
                <div className='p-2 text-center'>
                    <img className='img-fluid' src={logo} alt="Logo Groupomania" />
                    <h2 className='pt-2'><small className='text-muted'>Se connecter</small>  </h2>
                </div>
                <form className='col-sm-10 col-md-8 col-xl-7 mx-auto' onSubmit={handleSubmit}>
                    <div className="form-group ">
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={handleChange}
                            type="email"
                            value={credentials.email}
                            className={"form-control " + (error && "is-invalid")}
                            placeholder='Email de connexion'
                            name="email"
                        />
                        {error && <p className="invalid-feedback">{error}</p>}
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={handleChange}
                            type="password"
                            value={credentials.password}
                            className={"form-control " + (error && "is-invalid")}
                            placeholder='Email de connexion'
                            name="password"
                        />
                        {error && <p className="invalid-feedback">{error}</p>}
                    </div>
                    <div className='d-flex align-items-center justify-content-between mt-3 mb-5'>
                        <button type="submit" className="btn btn-primary">Se connecter</button>
                        <div className='d-flex flex-column'>
                            <Link className='mb-2' to={"/signup"}>Créer un compte</Link>
                            <Link to={"/forgot-passowrd"}>Mot de passe oublié ?</Link>
                        </div>
                        
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default LoginPage;