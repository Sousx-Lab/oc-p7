import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { EditSvg , MoreVerticalSvg, TrashSvg } from "../IconsSvg";
import { Link } from "react-router-dom";

const PostMoreOptions = ({ post }) => {

    const { user } = useContext(UserContext);

    const [menuActive, setMenuActive] = useState('')
    handleMoreOptionMenu = () => {
        const moreOptionMenu = document.getElementById(`more-option-menu-${post.id}`);
        if (moreOptionMenu) {
            if (moreOptionMenu.classList.contains('d-none')) {
                setMenuActive('-active')
                moreOptionMenu.classList.remove('d-none')
                moreOptionMenu.classList.add('d-block')
            } else {
                setMenuActive('')
                moreOptionMenu.classList.remove('d-block')
                moreOptionMenu.classList.add('d-none')
            }
        }
    }

    return (
        <div className="position-absolute end-0" title="Plus..." onClick={handleMoreOptionMenu}>
            <div className="icon-info position-relative">
                <i className={`float-end rounded-circle icon-info--bg${menuActive} p-1`}>
                    <MoreVerticalSvg />
                </i>
            </div>
            <div id={`more-option-menu-${post.id}`}
                className="d-none bg-white shadow p-2 position-absolute" 
                style={{ top: "40px", right: "0", width: "200px", cursor: "default", borderRadius: "3px"}} >
                <ul className="list-unstyled mb-1">
                    <li className="p-2">
                        {user.roles.includes('ROLE_ADMIN') ? (
                            <a href="#" className="text-black text-decoration-none" title="Editer ce post">
                                Modérer ce post
                                <i className="float-end"><EditSvg size={18} strokeWidth={"1"} /></i>
                            </a>
                        ) : (
                            <div className="text-muted text-decoration-none cursor-not-allowed" title="Editer ce post">
                                Modérer ce post
                                <i className="float-end"><EditSvg size={18} strokeWidth={"1"}  /></i>
                            </div>
                        )}
                    </li>
                    <li className="p-2">
                        {user.id === post.User.id || user.roles.includes('ROLE_ADMIN') ? (
                            <a href="#" className="text-danger text-decoration-none" title="Supprimer ce post" >
                                Supprimer ce post
                                <i className="float-end"><TrashSvg size={18} stroke={"red"} strokeWidth={"1"} /></i>
                            </a>
                        ) : (
                            <div className="text-muted text-decoration-none cursor-not-allowed" title="Supprimer ce post">
                                Supprimer ce post
                                <i className="float-end"><TrashSvg size={18} strokeWidth={"1"} /></i>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    )

}

export default PostMoreOptions;