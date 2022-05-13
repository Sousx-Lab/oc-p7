import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import { PublicationContext } from "../contexts/PublicationContext";
import { EditSvg, MoreVerticalSvg, TrashSvg } from "./IconsSvg";

const MoreOptionsMenu = ({ publication, publicationUserId}) => {

    const { setPublication } = useContext(PublicationContext);
    const { user } = useContext(UserContext);
    const [id, setId] = useState('');
    const [menuActive, setMenuActive] = useState('')
    const menuRef = useRef(null);
    
    const hideMenuIfClickOutside = (event, parent) => {
        if (!event.target.closest(`#more-options-${id}`)) {
            parent.classList.add('d-none')
            parent.classList.remove('d-block')
            setMenuActive('');
        }
    }
    handleMoreOptionMenu = async (e) => {
        const moreOptionMenu = menuRef.current;
        if (moreOptionMenu) {
            if (moreOptionMenu.classList.contains('d-none') && menuActive !== "-active") {
                setMenuActive('-active')
                moreOptionMenu.classList.remove('d-none')
                moreOptionMenu.classList.add('d-block')
                setPublication(publication);
                document.addEventListener('click', (event) => 
                  hideMenuIfClickOutside(event, moreOptionMenu))
            } else {
                setMenuActive('')
                moreOptionMenu.classList.remove('d-block')
                moreOptionMenu.classList.add('d-none')
                document.removeEventListener('click', (event) => handleMoreOptionMenu(event, moreOptionMenu))
            }
        }
    }

    useEffect(() => {
        setId(publication?.id)
    }, [publication])
    return (
        <>
            <div id={`more-options-${id}`} className="position-absolute end-0" title="Plus..." onClick={handleMoreOptionMenu}
                role="button"
                style={{ zIndex: 1060 }}>
                <div className="icon-info position-relative">
                    <i className={`float-end rounded-circle icon-info--bg${menuActive} p-1`}>
                        <MoreVerticalSvg />
                    </i>
                </div>
                <div id={`more-option-menu-${id}`} ref={menuRef}
                    className="d-none bg-white shadow position-absolute"
                    style={{ top: "40px", right: "0", width: "200px", cursor: "default", borderRadius: "3px" }} >
                    <ul className="list-unstyled mb-0">
                        <li className="p-1 bg-light-hover">
                            {user.roles.includes('ROLE_ADMIN') ? (
                                <div className="text-black text-decoration-none d-flex justify-content-between p-2" role="button"
                                    title="Editer ce post"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#edit-publication-modal${id}`}>
                                    Modérer ce post
                                    <EditSvg size={18} strokeWidth={"1"} />
                                </div>
                            ) : (
                                <div className="text-muted text-decoration-none cursor-not-allowed d-flex justify-content-between p-2"
                                    title="Editer ce post">
                                    Modérer ce post
                                    <EditSvg size={18} strokeWidth={"1"} />
                                </div>
                            )}
                        </li>
                        <li className="p-1 bg-light-hover">
                            {user.id === publicationUserId || user.roles.includes('ROLE_ADMIN') ? (
                                <div className="text-danger text-decoration-none d-flex justify-content-between p-2" role="button"
                                    title="Supprimer ce post"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#delete-publication-modal${id}`}>
                                    Supprimer ce post
                                    <TrashSvg size={18} stroke={"red"} strokeWidth={"1"} />
                                </div>

                            ) : (
                                <div className="text-muted text-decoration-none cursor-not-allowed d-flex justify-content-between p-2"
                                    title="Supprimer ce post">
                                    Supprimer ce post
                                    <TrashSvg size={18} strokeWidth={"1"} />
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )

}

export default MoreOptionsMenu;