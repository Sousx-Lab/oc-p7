import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserPopOver from '../post/UserPopOver';
import MoreOptionsMenu from '../MoreOptionsMenu';
import MediaType from '../MediaType';
import defautlAvatar from '../../assets/img/d-avatar.svg';
import { dateDiff } from '../../services/outils/dateHandler';
import { PublicationContext } from "../../contexts/PublicationContext";
import ConfiramtionDeleteModal from "../ConfiramtionDeleteModal";
import EditModal from "../EditModal";
import { deleteComment, updateComment } from "../../services/Api/commentary/commentsApi";
import { toast } from 'react-toastify';
import Loader from '../layout/Loader';

const CommentariesSection = ({ commentaries = [] }) => {

    const [publication, setPublication] = useState('')
    const [comments, setComments] = useState([]);

    const [deleteLoader, setDeleteLoader] = useState(null);
    const DeleteComment = async (id) => {
        setDeleteLoader(id)
        try {
            await deleteComment(id);
            toast.success("Commentaire supprimé avec succès");
            setDeleteLoader(null);
            setComments(comments.filter(post => post.id !== id));
        } catch (error) {
            setDeleteLoader(null)
            toast.error("Une erreur est survenue lors de la suppression du commentaire");
        }

    }

    /**
     * @param {SubmitEvent} event
     * @returns {boolean}
     */
    const handleUpdate = async (id, data) => {
        try {
            const reponse = await updateComment(id, data);
            let commentary = await reponse.json()
            commentaries = commentaries.map(c => c.id !== commentary.id ? c : commentary)
            setComments(commentaries);
            return reponse.ok;
        } catch (error) {
            toast.error("Une erreur est survenue lors de la mise à jour du post");
        }
    }

    useEffect(() => {
        setComments(commentaries)
    }, [commentaries])
    return (
        <PublicationContext.Provider value={{ publication, setPublication }} >
            <ConfiramtionDeleteModal handleDelete={DeleteComment} />
            <EditModal handleUpdate={handleUpdate} editorContext="edit-comment-publication" />
            {comments.length > 0 && comments.map((comment, key) => {
                return (
                    <div key={key} className="border-start border-end border-bottom border-1 pt-4 pb-5 bg-light-hover">
                        <div className="d-flex position-relative">
                            <div className="pe-2">
                                <Link to={`../user/${comment.User.id}`}
                                    className="d-block overflow-auto "
                                    data-popover="true" >
                                    <img className="rounded-circle border border-3" width={54} alt={`photo de profile de ${comment.User.firstName} ${comment.User.lastName}`}
                                        src={comment.User.profilePicture || defautlAvatar}
                                        data-holder-rendered="true" />
                                </Link>
                            </div>
                            <div className="d-flex flex-column ms-2 w-100">
                                <div className="text-start pb-3">
                                    <Link to={`../user/${comment.User.id}`}
                                        className="fw-bold text-capitalize link-dark"
                                        data-popover="true">

                                        {`${comment.User.firstName} ${comment.User.lastName}`}
                                    </Link>
                                    <div className="d-inline text-muted fs-6 ps-2"><small>- {dateDiff(comment.createdAt)}</small></div>
                                    <UserPopOver id={comment.User.id} user={comment.User} />
                                </div>
                                {deleteLoader === comment.id ? (
                                    <div className="position-absolute" style={{ left: '95%' }}>
                                        <Loader width="1.2" height="1.2" />
                                    </div>
                                ) : (
                                    <MoreOptionsMenu publication={comment} publicationUserId={comment.User.id} editModalId={comment.id} />
                                )}
                                <div className=" text-decoration-none">
                                    <p className="pe-4 pb-3 m-0 text-break text-body text-start">{comment.content}</p>
                                </div>
                                {comment.media && (
                                    <MediaType mediaType={comment.mediaType} media={comment.media} id={comment.id} />
                                )}
                            </div>
                        </div>
                    </div>
                )
            })
            }
        </PublicationContext.Provider>
    )
}

export default CommentariesSection;