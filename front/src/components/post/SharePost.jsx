import React from "react";
import { CopySvg, MailSvg, ShareSvg } from "../IconsSvg";
import { toast } from 'react-toastify';

const SharePost = ({ post }) => {

    const handleShareMenu = () => {
        const shareMenu = document.getElementById(`share-menu-${post.id}`);
        if (shareMenu) {
            if (shareMenu.classList.contains('d-none')) {
                shareMenu.classList.remove('d-none')
                shareMenu.classList.add('d-block')
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
        <div className="d-flex align-items-center position-relative" title="Partager..." onClick={handleShareMenu}>
            <ShareSvg />
            <div id={`share-menu-${post.id}`}
                className="d-none position-absolute bg-white shadow p-2"
                style={{ top: "40px", right: "0", width: "200px", cursor: "default", borderRadius: "3px", zIndex: "1080" }}>
                <ul className="list-unstyled mb-1">
                    <li className="p-2">
                        <a href="/#" className="text-black text-decoration-none" title="Partager par email" >Partager par email
                            <i className="float-end"><MailSvg size={18} /></i>
                        </a>
                    </li>
                    <li className="p-2">
                        <a href="/#" className="text-black text-decoration-none"
                            title="Copier le lien" data-uri={`post/${post.id}`} onClick={handleCopyLink}>Copier le lien...
                            <i className="float-end"><CopySvg size={18} /></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SharePost;