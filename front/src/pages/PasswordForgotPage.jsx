import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import logo from '../assets/img/icon-top-font-monochrome-purple.svg'
import { Link } from 'react-router-dom';
import { forgotPassword } from '../services/Api/security/authenticator';
import { toast } from 'react-toastify';
import { routes } from '../config/routes/routes.config';

const PasswordForgotPage = () => {

    let { user } = useContext(UserContext);

    const [credentials, setCredentials] = useState({
        email: '',
    })

    let isCredentials = credentials.email ? false : true

    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget
        setCredentials({ ...credentials, [name]: value });

    }

    const [error, setError] = useState('');
    const [isSubmited, setIsSubmited] = useState(false);
    const [isLaoding, setIsLoading] = useState(false)
    const [success, setSucess] = useState(false);
    let navigate = useNavigate();

    /**
     * @param {SubmitEvent} event 
     */
    const handleSubmit = async event => {
        setIsSubmited(true)
        setIsLoading(true)
        event.preventDefault();
        const { error, status } = await forgotPassword(credentials)
        if (error) {
            if (status >= 500) {
                toast.error("Une erreur s'est produite! Veuillez réessayer plus tard");
                setIsSubmited(false);
                return;
            }
            setError(error?.message || "Veuillez indiquer votre email de connexion !");
            setIsSubmited(false);
            return;
        }
        setSucess(`Veuillez vérifier votre boite de récéption. Un lien à été envoyé par email à l'adresse indiqué`)
        toast.success(`Un lien à été envoyé par email à l'adresse indiqué 📥`)
        setIsLoading(false);
    }

    useEffect(() => {
        document.title = "Groupomania | Mot de passe oublié"
        if (user) {
            navigate('/', { replace: true })
        }
    }, []);
    return (

        <div className='d-flex flex-column mx-auto col-md-8 col-lg-5 mt-5 entrance-page'>
            <div className='p-2 text-center'>
                <img className='img-fluid' src={logo} alt="Logo Groupomania" />
                <h2 className='pt-2 pb-2'><small className='text-muted'>Mot de passe oublié</small></h2>
                <p className='col-8 mx-auto '>Veuillez indiquer votre email de connexion.<br /> Un email vous seras envoyé pour renouveler votre mot de passe</p>
            </div>
            <form className='col-sm-10 col-md-8 col-xl-7 mx-auto' onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        type="email"
                        value={credentials.email}
                        className={`form-control ${error && "is-invalid" || success && "is-valid"}`}
                        placeholder='email@domain.com'
                        name="email"
                        required
                        readOnly={isSubmited}
                    />
                    {error && <p className="invalid-feedback">{error}</p>}
                    {success && <p className="valid-feedback">{success}</p>}
                </div>
                <div className='d-flex align-items-center justify-content-between mt-3 mb-5'>
                    <button type="submit" disabled={(isSubmited || isCredentials) ? true : false} className="btn btn-primary rounded-2">
                        {isLaoding && (
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        )}
                        Envoyez
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

export default PasswordForgotPage;