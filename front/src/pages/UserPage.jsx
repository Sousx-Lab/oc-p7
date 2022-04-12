import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from 'react-query';
import { getUserById } from "../services/Api/user/usersApi";
import { toast } from 'react-toastify'
import defautlAvatar from '../assets/img/d-avatar.svg';

const UserPage = () => {

    const { id } = useParams();

    const [user, setUser] = useState({});

    const { isLoading } = useQuery(['User', id], () => getUserById(id), {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setUser(data);
        },
        onError: (error) => {
            toast.error("Une erreur s'est produite lors du chargement !...");
        }
    })

    return (
        <div className="container">
            <div className="row col-sm-12 col-md-8 col-xl-6 mx-auto border border-black pt-3 pb-3 mt-1">
                <div className="d-block overflow-auto">
                    <img className="rounded-circle mb-1" width={54} alt={`profile picuture`}
                        src={user.profilePicture || defautlAvatar}
                        data-holder-rendered="true" />
                </div>
                <div className="d-block text-capitalize fw-bold text-break mb-3 text-decoration-none link-dark">
                    {`${user.firstName} ${user.lastName}`}
                </div>
                <p className="text-break col-xl-6 col-sm-10">{user?.bio || ""}</p>
            </div>
        </div>
    );
}

export default UserPage;