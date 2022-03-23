import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defautlAvatar from '../assets/img/d-avatar.svg';

const UserPopOver = ({ user, linkHoverLeave }) => {

    const [isHover, setIsHover] = useState(false)
    
    return (
        <div className="d-none position-absolute bg-white shadow p-3 user-popover mt-2">
            <Link to={`user/${user.id}`}>
                <img className="rounded-circle mb-1" width={54} alt={`profile picuture`}
                    src={user.profilePicture || defautlAvatar}
                    data-holder-rendered="true" />
            </Link>
            <Link to={`user/${user.id}`}
                className="d-block text-capitalize fw-bold text-break mb-3 text-decoration-none link-dark">
                {`${user.firstName} ${user.lastName}`}
            </Link>
            <div className="mt-2 text-break">{user?.bio || "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque pen"}</div>
        </div>
    )
}

export default UserPopOver;