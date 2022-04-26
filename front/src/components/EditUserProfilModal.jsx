import React, { useContext, useEffect, useState } from "react";
import { EditSvg } from "./IconsSvg";
import defautlAvatar from '../assets/img/d-avatar.svg';
import { UserContext } from "../contexts/UserContext";
import { updateUser } from "../services/Api/user/usersApi";
import { toast } from "react-toastify";
import { saveUser } from "../services/Api/security/authenticator";
import { isValidHttpUrl } from "../services/outils/objectValidator";

const EditUserProfilModal = ({ userProperties = {}, setUpdatedData }) => {

    const { user } = useContext(UserContext);
    const [userData, setUserData] = useState({
        ...userProperties,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [isPasswordChange, setIsPasswordChange] = useState(false);
    let isUserData = !Object.keys(userData).every((k) => userData[k] !== '')
    const fileAccept = '.jpeg,.jpg,.png,.webp,';

    const handleChange = ({ currentTarget }) => {
        setUserData({ ...userData, [currentTarget.name]: currentTarget.value });
    }
    const handlePreview = (e) => {
        const reader = new FileReader();
        let file = e.target.files[0];
        if (file && file.type.match('image.*')) {
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                setUserData({ ...userData, profilePicture: reader.result });
            };
        }

    }
    const [error, setError] = useState(null);
    const [isSubmited, setIsSubmited] = useState(false);
    /**
     * @param {SubmitEvent} event 
     */
    const handleSubmit = async (event) => {
        setIsSubmited(true);
        event.preventDefault();
        const form = new FormData(event.target);
        if (!form.get('profilePicture').name && isValidHttpUrl(userData.profilePicture)) {
            form.set('profilePicture', user.profilePicture.split('/').pop());
            console.log(form.get('role'));
        }
        const response = await updateUser(userData.id, form);
        if (!response.ok) {
            let error = await response.json();
            setError(error.validationError);
            setIsSubmited(false);
            toast.error('Une erreur est survenue lors de la mise à jour de votre profil');
            return;
        }
        if (userData.id === user.id) {
            await saveUser(await response.json());
        }
        setUpdatedData(userData);
        setError(null);
        toast.success('Votre profil a été mis à jour avec succès');
        setUserData({ ...userData, currentPassword: "", newPassword: "", confirmNewPassword: "" });
        setIsSubmited(false);
        document.getElementById('edit-profil-close-modal').click();
    }

    useEffect(() => {
        setUserData(userProperties);
    }, [userProperties]);
    return (
        <div id="edit-profil-modal" className="modal fade" tabIndex="-1" aria-hidden="true" style={{ zIndex: 1090 }}>
            <div className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                <div className="modal-content rounded-2">
                    <div className="modal-header text-white bg-primary">
                        <h6 className="modal-title">Editer votre profil
                            <i className="ps-2"><EditSvg stroke="#ffff" /></i>
                        </h6>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <form className='col-lg-8 mx-auto' onSubmit={handleSubmit} encType={"multipart/form-data"}>
                                <div className="mx-auto text-center mb-3">
                                    <img className="rounded-circle mb-1 border border-3 border-primary position-relative"
                                        width={84} alt={`profile picuture`}
                                        style={{ maxWidth: '100%', maxHeight: '84px', objectFit: 'cover' }}
                                        src={userData.profilePicture || defautlAvatar}
                                        data-holder-rendered="true" />
                                    <div className="d-flex justify-content-center">
                                        <input
                                            onChange={handlePreview}
                                            type="file"
                                            className={"form-control form-control-sm w-50 " + (error?.profilePicture && "is-invalid")}
                                            accept={fileAccept}
                                            multiple={false}
                                            name="profilePicture" />
                                        {error?.profilePicture && <p className="invalid-feedback">{error?.profilePicture.message}</p>}
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="firstName">Prénom</label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        value={userData.firstName || ""}
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
                                        value={userData.lastName || ""}
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
                                        value={userData.email || ""}
                                        className={"form-control " + (error?.email && "is-invalid")}
                                        placeholder='email@domain.com'
                                        name="email"
                                        required
                                    />
                                    {error?.email && <p className="invalid-feedback">{error?.email.message}</p>}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="bio">Biographie</label>
                                    <textarea
                                        onChange={handleChange}
                                        type="text"
                                        style={{ "resize": "none" }}
                                        maxLength={"128"}
                                        rows="5"
                                        value={userData.bio || ""}
                                        className={"form-control " + (error?.bio && "is-invalid")}
                                        placeholder={`Hello, ;-)`}
                                        name="bio"
                                        required
                                    />
                                    {error?.bio && <p className="invalid-feedback">{error?.bio.message}</p>}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="currentPassword">Mot de passe actuel
                                        <i className="text-danger">*</i>
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        type="password"
                                        value={userData.currentPassword || ""}
                                        className={"form-control " + (error?.currentPassword && "is-invalid")}
                                        placeholder="********"
                                        name="currentPassword"
                                        required
                                    />
                                    {error?.currentPassword && <p className="invalid-feedback">{error?.currentPassword.message}</p>}
                                </div>
                                <div className="form-check form-switch mb-4">
                                    <label htmlFor="newPassword" className="form-check-label">Changer mon mot de passe</label>
                                    <input
                                        onChange={() => setIsPasswordChange(!isPasswordChange)}
                                        checked={isPasswordChange}
                                        type="checkbox"
                                        className="form-check-input"
                                        id="newPassword"
                                    />
                                </div>
                                {isPasswordChange && (
                                    <>
                                        <div className="form-group mb-3">
                                            <label htmlFor="newPassword">Nouveau de passe
                                                <i className="text-danger">*</i>
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                type="password"
                                                value={userData.newPassword || ""}
                                                className={"form-control " + (error?.newPassword && "is-invalid")}
                                                placeholder="8 caractères minimums, au moins une majuscule et un chiffre Répétez le même mot de passe !"
                                                name="newPassword"
                                                required
                                                disabled={!isPasswordChange}
                                            />
                                            {error?.currentPassword && <p className="invalid-feedback">{error?.currentPassword.message}</p>}
                                        </div>
                                        <div className="form-group mb-5">
                                            <label htmlFor="confirmNewPassword">Confirmez le nouveu mot de passe
                                                <i className="text-danger">*</i>
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                type="password"
                                                value={userData.confirmNewPassword || ""}
                                                className={"form-control " + (error?.confirmNewPassword && "is-invalid")}
                                                placeholder="Répétez le même mot de passe !"
                                                name="confirmNewPassword"
                                                required
                                                disabled={!isPasswordChange}
                                            />
                                            {error?.confirmNewPassword && <p className="invalid-feedback">{error?.confirmNewPassword.message}</p>}
                                        </div>
                                    </>
                                )}
                                {user.roles.includes("ROLE_ADMIN") && (
                                    <div className="form-group mb-5">
                                        <label htmlFor="pet-select">Rôle utilisateur</label>
                                        <select defaultValue={"ROLE_ADMIN"} id="role" name="role" className="form-select" aria-label="select role">
                                            <option value="ROLE_ADMIN">Administrateur</option>
                                        </select>
                                    </div>
                                )}
                                <div className='d-flex mb-5 justify-content-between'>
                                    <button type="submit" disabled={(isSubmited || isUserData) ? true : false} className="btn btn-primary rounded-2">
                                        {isSubmited && (
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        )}
                                        Enregistrer
                                    </button>
                                    <button type="button" className="btn btn-danger rounded-2" data-bs-toggle="modal" data-bs-target="#delete-user-modal" >
                                        Supprimer mon compte
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button id="edit-profil-close-modal" type="button" className="btn btn-primary rounded-2 shadow" 
                            data-bs-dismiss="modal" onClick={() => setUserData(userProperties)}>
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditUserProfilModal;