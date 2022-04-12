import React from "react";
import { Link } from "react-router-dom";
import defautlAvatar from '../../assets/img/d-avatar.svg';

const UserPopOver = ({ id, user}) => {
    
    return (
        <div id={`user-pop-${user.id}`} className="d-none position-absolute bg-white shadow p-3 user-popover mt-2 start-0">
            <Link to={`user/${user.id}`} className="d-block overflow-auto">
                <img className="rounded-circle mb-1" width={54} alt={`profile picuture`}
                    src={user.profilePicture || defautlAvatar}
                    data-holder-rendered="true" />
            </Link>
            <Link to={`user/${user.id}`}
                className="d-block text-capitalize fw-bold text-break mb-3 text-decoration-none link-dark">
                {`${user.firstName} ${user.lastName}`}
            </Link>
            <div className="mt-2 text-break">{user?.bio || ""}</div>
        </div>
    )
}

export default UserPopOver;