import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import logo from '../assets/img/icon-top-font-monochrome-red.svg'
import { Link } from 'react-router-dom';
import { signup, login } from '../services/Api/security/authenticator';
import { toast } from 'react-toastify';
import { routes } from '../config/routes/routes.config';

const SignUpPage = () => {

    let { user, setUser } = useContext(UserContext);

    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    let isCredentials = !Object.keys(credentials).every((k) => credentials[k] !== '')
    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget
        setCredentials({ ...credentials, [name]: value })

    }


    const [error, setError] = useState();
    const [isSubmited, setIsSubmited] = useState(false)
    let navigate = useNavigate()
    /**
     * @param {Event} event 
     */
    const handleSubmit = async event => {
        setIsSubmited(true)
        event.preventDefault();

        /** signup */
        const validationError = await signup(credentials)
        if (validationError) {
            setError(validationError.validationError)
            setIsSubmited(false)
            return;
        }

        /** try to login user  */
        const { user, error, status } = await login({
            email: credentials.email,
            password: credentials.password
        })
        if (error) {
            if (status >= 500) {
                toast.error("Une erreur s'est produite lors de la connexion !");
                navigate('/login', { replace: true })
            }
            setIsSubmited(false);
            toast.error(error.message);
            return;
        }
        setUser(user);
        navigate('/', { replace: true })
        toast.success(`Bonjour ${user.firstName} 👋`);
    }

    useEffect(() => {
        document.title = "Groupomania | S'inscrire"
        if (user) {
            navigate('/', { replace: true })
        }
    }, []);
    return (
        <div className='d-flex flex-column mx-auto col-md-8 col-lg-5 mt-5 entrance-page'>
            <div className='p-2 text-center'>
                <img className='img-fluid' src={logo} alt="Logo Groupomania" />
                <h2 className='pt-2'><small className='text-muted'>Créer un compte</small>  </h2>
            </div>
            <form className='col-sm-10 col-md-8 col-xl-7 mx-auto' onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="firstName">Prénom</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        value={credentials.firstName}
                        className={"form-control " + (error?.firstName && "is-invalid")}
                        placeholder='John'
                        name="firstName"
                        required
                    />
                    {error?.firstName && <p className="invalid-feedback">{error?.firstName.message}</p>}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="lastName">Nom</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        value={credentials.lastName}
                        className={"form-control " + (error?.lastName && "is-invalid")}
                        placeholder='Doe'
                        name="lastName"
                        required
                    />
                    {error?.lastName && <p className="invalid-feedback">{error?.lastName.message}</p>}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        type="email"
                        value={credentials.email}
                        className={"form-control " + (error?.email && "is-invalid")}
                        placeholder='email@domain.com'
                        name="email"
                        required
                    />
                    {error?.email && <p className="invalid-feedback">{error?.email.message}</p>}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        value={credentials.password}
                        className={"form-control " + (error?.password && "is-invalid")}
                        placeholder='8 caractères minimums, au moins une majuscule et un chiffre'
                        name="password"
                        required
                    />
                    {(error?.password && (
                        <ul className='list-group list-unstyled'>
                            {error?.password.message.split(',').map((message, k) =>
                                <li key={k} className="text-danger"><small>{message}</small></li>

                            )}
                        </ul>
                    ))}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Confirmez le mot de passe</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        value={credentials.confirmPassword}
                        className={"form-control " + (error?.confirmPassword && "is-invalid")}
                        placeholder='Répétez le même mot de passe !'
                        name="confirmPassword"
                        required
                    />
                    {error?.confirmPassword && <p className="invalid-feedback">{error?.confirmPassword.message}</p>}
                </div>
                <div className='d-flex align-items-center justify-content-between mt-3 mb-5'>
                    <button type="submit" disabled={(isSubmited || isCredentials) ? true : false} className="btn btn-primary rounded-2">
                        {isSubmited && (
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        )}
                        S'inscrire
                    </button>
                    <div className='d-flex flex-column'>
                        <Link className='mb-2' to={routes.login}>Se connecter</Link>
                        <Link to={routes.passwordForgot}>Mot de passe oublié ?</Link>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default SignUpPage;