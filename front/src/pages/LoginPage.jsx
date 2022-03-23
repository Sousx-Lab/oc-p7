import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import logo from '../assets/img/icon-top-font-monochrome-purple.svg'
import { Link } from 'react-router-dom';
import { login } from '../services/Api/security/authenticator';
import { toast } from 'react-toastify';
import { routes } from '../config/routes/routes.config';

const LoginPage = () => {

    let { user, setUser } = useContext(UserContext);

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    let isCredentials = !Object.keys(credentials).every((k) => credentials[k] !== '');
    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget
        setCredentials({ ...credentials, [name]: value });

    }

    const [error, setError] = useState('');
    const [isSubmited, setIsSubmited] = useState(false);
    let navigate = useNavigate();

    /**
     * @param {SubmitEvent} event 
     */
    const handleSubmit = async event => {
        try {
            setIsSubmited(true)
            event.preventDefault();
            const { user, error, status } = await login(credentials)
            if (error) {
                if (status >= 500) {
                    toast.error("Une erreur s'est produite! Veuillez réessayer plus tard");
                    return;
                }
                setError(error.message)
                setIsSubmited(false);
                toast.error(error.message);
                return;
            }
            setUser(user);
            navigate('/', { replace: true })
            toast.success(`Bonjour ${user.firstName} 👋`)
        } catch (error) {
            toast.error("Une erreur s'est produite! Veuillez réessayer plus tard");
            setIsSubmited(false)
        }

    }

    useEffect(() => {
        document.title = "Groupomania | Se connecter"
        if (user) {
            navigate('/', { replace: true })
        }
    }, []);
    return (
        <div className='d-flex flex-column mx-auto col-md-8 col-lg-5 mt-5 entrance-page'>
            <div className='p-2 text-center'>
                <img className='img-fluid' src={logo} alt="Logo Groupomania" />
                <h2 className='pt-2'><small className='text-muted'>Se connecter</small></h2>
            </div>
            <form className='col-sm-10 col-md-8 col-xl-7 mx-auto' onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        type="email"
                        value={credentials.email}
                        className={`form-control ${error && "is-invalid"}`}
                        placeholder='email@domain.com'
                        name="email"
                        required
                    />
                    {error && <p className="invalid-feedback">{error}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        value={credentials.password}
                        className={`form-control ${error && "is-invalid"}`}
                        placeholder='Mot de passe'
                        name="password"
                        required
                    />
                    {error && <p className="invalid-feedback">{error}</p>}
                </div>
                <div className='d-flex align-items-center justify-content-between mt-3 mb-5'>
                    <button type="submit" disabled={(isSubmited || isCredentials) ? true : false} className="btn btn-primary rounded-2">
                        {isSubmited && (
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        )}
                        Se connecter
                    </button>
                    <div className='d-flex flex-column'>
                        <Link className='mb-2' to={routes.signup}>Créer un compte</Link>
                        <Link to={routes.passwordForgot}>Mot de passe oublié ?</Link>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default LoginPage;