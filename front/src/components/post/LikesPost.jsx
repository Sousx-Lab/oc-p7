import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { HeartSvg } from '../IconsSvg';
import { LikePost } from '../../services/Api/posts/postsApi';
import { toast } from 'react-toastify';

const LikesPost = ({ usersLiked = [], postId }) => {

    const { user } = useContext(UserContext);
    const [isLiked, setIsLiked] = useState(usersLiked.includes(user.id));

    const handleLikes = async () => {
        try {
            const response = await LikePost(postId);
            if (response.ok) {
                if (isLiked) {
                    usersLiked.splice(usersLiked.indexOf(user.id), 1);
                    setIsLiked(false);
                    return;
                }
                usersLiked.push(user.id);
                setIsLiked(true);
                return;
            }
        } catch (error) {
            toast.error("Une erreur s'est produite lors du chargement !...");
        }
    }


    return (
        <div className="d-flex align-items-center icon-like" role="button" onClick={handleLikes}>
            {isLiked ? (
                <>
                    <div className="rounded-circle icon-like--bg-active p-2" title="Annuler le like" >
                        {<HeartSvg fill="#e02727" stroke="none" strokeWidth="1.0" />}
                    </div>
                    <span className="ps-1 small icon-like--text-active"><small>{usersLiked.length}</small></span>
                </>
            ) : (
                <>
                    <div className="rounded-circle icon-like--bg p-2" title="Ajouter une like" >
                        {<HeartSvg />}
                    </div>
                    <span className="ps-1 small icon-like--text"><small>{usersLiked.length}</small></span>
                </>
            )}
        </div>
    )

}

export default LikesPost;