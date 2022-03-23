import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import logo from '../assets/img/icon-top-font-monochrome-purple.svg'
import { Link } from 'react-router-dom';
import { resetPassword } from '../services/Api/security/authenticator';
import { toast } from 'react-toastify';
import { routes } from '../config/routes/routes.config';
import { useSearchParams } from 'react-router-dom';

const PasswordResetPage = () => {

    const [searchParams] = useSearchParams()
    let { user } = useContext(UserContext);

    const [credentials, setCredentials] = useState({
        password: '',
        confirmPassword: '',
        token: searchParams.get('token')
    })
    let isCredentials = !Object.keys(credentials).every((k) => credentials[k] !== '');
    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget
        setCredentials({ ...credentials, [name]: value });

    }

    const [error, setError] = useState();
    const [isSubmited, setIsSubmited] = useState(false);
    let navigate = useNavigate();

    /**
     * @param {SubmitEvent} event 
     */
    const handleSubmit = async event => {
        try {
            setIsSubmited(true)
            event.preventDefault();
            const { error, status } = await resetPassword(credentials)
            if (error) {
                if (status >= 500) {
                    toast.error("Une erreur s'est produite! Veuillez réessayer plus tard");
                    return;
                }
                if (status === 422) {
                    navigate('/login', { replace: true })
                    toast.error("Le nouveau mot de passe n'a pas pu être réinitialisé !");
                }
                setError(error?.validationError)
                setIsSubmited(false);
                return;
            }
            toast.success('Le nouveau mot de passe à bien été enregistré !')
            navigate('/login', { replace: true })
        } catch (error) {
            toast.error("Une erreur s'est produite! Veuillez réessayer plus tard");
            setIsSubmited(false)
        }


    }
    useEffect(() => {
        document.title = "Groupomania | Nouveau mot de passe"
        if (!searchParams.get('token')) {
            setIsSubmited(true);
            toast.error(`Token introuvable. Veuillez vérifier le lien envoyé par email👋`)
        }
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
                    <label htmlFor="password">Nouveau mot de passe</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        value={credentials.password}
                        className={`form-control ${error && "is-invalid"}`}
                        placeholder='8 caractères minimums, au moins une majuscule et un chiffre'
                        name="password"
                        required
                        readOnly={isSubmited}
                    />
                    {(error?.password && (
                        <ul className='list-group ms-3'>
                            {error?.password.message.split(',').map((message, k) =>
                                <li key={k} className="text-danger"><small>{message}</small></li>

                            )}
                        </ul>
                    ))}
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="confirmPassword">Confirmez le nouveau mot de passe</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        value={credentials.confirmPassword}
                        className={`form-control ${error && "is-invalid"}`}
                        placeholder='Répétez le même mot de passe !'
                        name="confirmPassword"
                        required
                        readOnly={isSubmited}
                    />
                    {error?.confirmPassword && <p className="invalid-feedback">{error?.confirmPassword.message}</p>}
                </div>
                <div className="form-group mb-3">
                    <input
                        onChange={null}
                        type="text"
                        value={credentials.token}
                        className="form-control"
                        name="token"
                        hidden
                        required
                        readOnly
                    />
                </div>
                <div className='d-flex align-items-center justify-content-between mt-3 mb-5'>
                    <button type="submit" disabled={(isSubmited || isCredentials) ? true : false} className="btn btn-primary rounded-2">
                        {isSubmited && (
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        )}
                        Valider
                    </button>
                    <div className='d-flex flex-column'>
                        <Link className='mb-2' to={routes.signup}>Créer un compte</Link>
                        <Link to={routes.login}>Se connecter</Link>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default PasswordResetPage;