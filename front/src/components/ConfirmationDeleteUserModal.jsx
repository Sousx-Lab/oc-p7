import React, { useContext, useState } from "react";
import { AlertTriangleSvg } from "./IconsSvg";
import { UserContext } from "../contexts/UserContext";
import { deleteUser } from "../services/Api/user/usersApi";

const ConfirmationDeleteUserModal = ({ userId }) => {

    const { user } = useContext(UserContext);
    const [password, setPassword] = useState("");
    const handleChange = ({ currentTarget }) => {
        setPassword(currentTarget.value);
        console.log(password)
    }
    const [error, setError] = useState();
    const handledeleteUser = (e) => {
        console.log(userId)
    }
    return (
        <div className="modal fade" id="delete-user-modal" tabIndex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content rounded-2">
                    <div className="modal-header text-white bg-danger">
                        <h6 className="modal-title" id="ModalLabel">
                            {user.id === userId ? "Supprimer mon compte" : "Suppression d'utilisateur ?"}
                            <i className="ps-2"><AlertTriangleSvg stroke="#ffff" /></i>
                        </h6>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body mt-2 mb-2">
                    <div className="col-lg-10 mx-auto mb-3">
                        <p>
                            {user.id === userId ? "Vous-voulez vraiment supprimer votre compte ?" : "Voulez-vous vraiment supprimer cet utilisateur ?"}
                        </p>
                        
                            <form >
                                <div className="form-group mb-3">
                                    <label htmlFor="currentPassword">Votre mot de passe actuel</label>
                                    <input
                                        onChange={handleChange}
                                        type="password"
                                        value={password || ""}
                                        className={"form-control " + (error?.password && "is-invalid")}
                                        placeholder="********"
                                        name="password"
                                        required
                                    />
                                    {error?.password && <p className="invalid-feedback">{error?.password.message}</p>}
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary rounded-2 shadow" data-bs-toggle="modal" data-bs-target="#edit-profil-modal">
                            Annuler
                        </button>
                        <button type="button" className="btn btn-danger rounded-2 shadow" onClick={handledeleteUser}>
                            Supprimer mon compte
                            <i className="ps-2"><AlertTriangleSvg stroke="#ffff" /></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationDeleteUserModal;