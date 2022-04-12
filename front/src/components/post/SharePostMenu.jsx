import React, {useContext} from "react";
import { CopySvg, MailSvg, ShareSvg } from "../IconsSvg";
import { UserContext } from "../../contexts/UserContext";
import { toast } from 'react-toastify';

const SharePostMenu = ({ post }) => {

    const {user} = useContext(UserContext);

    const handleShareMenu = () => {
        const shareMenu = document.getElementById(`share-post-menu-${post.id}`);
        if (shareMenu) {
            if (shareMenu.classList.contains('d-none')) {
                shareMenu.classList.remove('d-none')
                shareMenu.classList.add('d-block')
                document.addEventListener('click', ({ target }) => {
                    if (!target.closest(`#share-post-${post.id}`)) {
                        shareMenu.classList.add('d-none')
                        shareMenu.classList.remove('d-block')
                    }
                })
            } else {
                shareMenu.classList.remove('d-block')
                shareMenu.classList.add('d-none')
            }
        }
    }
    const handleCopyLink = (e) => {
        e.preventDefault();
        if (navigator.clipboard) {
            navigator.clipboard.writeText(`${window.location.href}${e.target.dataset.uri}`);
            toast.success("Le lien a été copié dans le presse-papier!")
        } else {
            toast.error("Votre navigateur ne supporte pas le copier/coller")
        }

    }
    return (
        <div id={`share-post-${post.id}`} className="d-flex align-items-center position-relative" title="Partager..." onClick={handleShareMenu} 
            role="button" 
            style={{zIndex: 1050}}>
            <div className="icon-success">
                <i className="rounded-circle icon-success--bg p-2"><ShareSvg strokeWidth="1"/></i>
            </div>
            <div id={`share-post-menu-${post.id}`}
                className="d-none position-absolute bg-white shadow"
                style={{ top: "40px", right: "0", width: "200px", cursor: "default", borderRadius: "3px", zIndex: "1080" }}>
                <ul className="list-unstyled mb-0">
                    <li className="p-1 bg-light-hover">
                        <a href={`mailto:?subject=${user.firstName} ${user.lastName}Partagee avec vous un post&amp;body=Regarde ce post ${window.location.href}posts/${post.id}`} 
                            className="text-black text-decoration-none d-flex justify-content-between p-2" 
                            title="Partager par email" >Partager par email
                            <MailSvg size={18} />
                        </a>
                    </li>
                    <li className="p-1 bg-light-hover">
                        <a href="/#" className="text-black text-decoration-none d-flex justify-content-between p-2"
                            title="Copier le lien" data-uri={`post/${post.id}`} onClick={handleCopyLink}>Copier le lien...
                            <CopySvg size={18} />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SharePostMenu;