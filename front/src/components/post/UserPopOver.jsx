import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import defautlAvatar from '../../assets/img/d-avatar.svg';

const UserPopOver = ({ user, keyId }) => {

    const [popOver, setPopOver] = useState(false);

    /**
     * @param {string} id post id
     */
    const handlePopOver = async (id) => {
        setPopOver(true)
        let userPop = document.getElementById(`user-pop-${id}`)
        if (userPop && !popOver) {
            setTimeout(() => {
                if (userPop.classList.contains('d-none')) {
                    userPop.classList.remove('d-none')
                    userPop.classList.add('d-block')
                }
                return;
            }, 800);
        }
    }

    /**
     * @param {string} id post id
     */
    const handlePopOverLeave = (id) => {
        setPopOver(false)
        let userPop = document.getElementById(`user-pop-${id}`)
        if (userPop && popOver) {
            setTimeout(() => {
                if (userPop.classList.contains('d-block')) {
                    userPop.classList.remove('d-block')
                    userPop.classList.add('d-none')
                }
                return;
            }, 800)
        }
    }

    return (
        <>
            <Link to={`/user/${user.id}`}
                className="fw-bold text-capitalize link-dark text-decoration-none"
                data-popover="true"
                onMouseEnter={() => handlePopOver(keyId ?? user.id)}
                onMouseLeave={() => handlePopOverLeave(keyId ?? user.id)}
            >
                {`${user.firstName} ${user.lastName}`}
            </Link>
            <div id={`user-pop-${keyId ?? user.id}`} className="d-none position-absolute bg-white shadow p-3 user-popover mt-2 start-0">
                <Link to={`user/${user.id}`} className="d-block overflow-auto">
                    <img className="rounded-circle mb-1 border border-3" width={54} alt={`profile picuture`}
                        src={user.profilePicture || defautlAvatar}
                        data-holder-rendered="true" />
                </Link>
                <Link to={`/user/${user.id}`}
                    className="d-block text-capitalize fw-bold text-break mb-3 text-decoration-none link-dark">
                    {`${user.firstName} ${user.lastName}`}
                </Link>
                <div className="mt-2 text-break">{user?.bio || ""}</div>
            </div>
        </>
    )
}

export default UserPopOver;