import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserPopOver = ({ user, defautlAvatar }) => {
    const [isHover, setIsHover] = useState(false)
    /**
     * 
     * @param {Event} event
     */
    const handleHover = (event) => {
        setIsHover(!isHover)
        console.log(isHover)
        let popover = event.target
        if (popover.classList.contains('d-block')) {
            if (popover.dataset.hover === 'true') {
                return
            }
            setTimeout(() => {
                popover.classList.remove('d-block')
                popover.classList.add('d-none')
            }, 500);
        }
    }
    return (
        <div className="d-none position-absolute bg-white shadow p-3 user-popover mt-2" data-hover={!isHover}
            onMouseLeave={handleHover}
            onMouseEnter={handleHover}
        >
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