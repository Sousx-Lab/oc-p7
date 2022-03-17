import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import logo from '../assets/img/icon-top-font-monochrome-red.svg'
import { Link } from 'react-router-dom';
import { login } from '../services/Api/security/authenticator';
import { toast } from 'react-toastify';

const LoginPage = () => {

    let { user, setUser } = useContext(UserContext);
    
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    let submited = (credentials.email && credentials.password) ? false : true
    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget
        setCredentials({ ...credentials, [name]: value })

    }

    const [error, setError] = useState('');
    let navigate = useNavigate()


    /**
     * @param {SubmitEvent} event 
     */
    const handleSubmit = async event => {
        submited = !submited
        event.preventDefault();
        const { user, error, status } = await login(credentials)
        if (error) {
            if(status >= 500){
                toast.error("Une erreur s'est produite! Veuillez réessayer plus tard");
                return;
            }
            setError(error.message)
            toast.error(error.message);
            return;
        }
        setUser(user);
        navigate('/', { replace: true })
        toast.success(`Bonjour ${user.firstName} 👋`)
    }

    useEffect(() => {
        document.title = "Groupomania | Se connecter"
    }, []);
    return (
        <div id='login-page' className='d-flex flex-column mx-auto col-md-8 col-lg-5 mt-5 '>
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
                        className={"form-control " + (error && "is-invalid")}
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
                        className={"form-control " + (error && "is-invalid")}
                        placeholder='Mot de passe'
                        name="password"
                        required
                    />
                    {error && <p className="invalid-feedback">{error}</p>}
                </div>
                <div className='d-flex align-items-center justify-content-between mt-3 mb-5'>
                    <button type="submit" disabled={submited} className="btn btn-primary rounded-2">Se connecter</button>
                    <div className='d-flex flex-column'>
                        <Link className='mb-2' to={"/signup"}>Créer un compte</Link>
                        <Link to={"/forgot-passowrd"}>Mot de passe oublié ?</Link>
                    </div>

                </div>
            </form>
        </div>

    )
}

export default LoginPage;