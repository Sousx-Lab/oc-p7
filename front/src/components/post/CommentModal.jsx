import React, {useState} from "react";
import { createComment } from '../../services/Api/commentary/commentsApi'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import defautlAvatar from '../../assets/img/d-avatar.svg';
import Editor from "../editor/Editor";
import { toast } from 'react-toastify';
import { CommentSvg } from "../IconsSvg";


const CommentModal = ({ post }) => {

    const navigate = useNavigate();
    const editorContext = "commentary"

    const SubmitComment = async (event, data) => {
        event.preventDefault();
        const form = new FormData(event.target);
        if (data.media.fileBlob) {
            form.set('media', data.media.fileBlob);
        }
        try {
            const response = await createComment(post?.id, form);
            if (response.ok) {
                await response.json();
                toast.success("Votre commentaire à été ajouté !");
                document.getElementById('comment-modal-close').click();
                return response.ok
            }
        } catch (error) {
            toast.error("Une erreur s'est produite lors de la création du commentaire");
        }
    }
    return (
        <div id="add-comment-modal" className="modal fade" tabIndex="-1" aria-hidden="true" style={{ zIndex: 1090 }}>
            <div className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                <div className="modal-content rounded-2">
                    <div className="modal-header text-white bg-primary">
                        <h6 className="modal-title">Ajouter un commentaire
                            <i className="ps-2"><CommentSvg stroke="#ffff" /></i>
                        </h6>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex text-center mb-5 mt-4">
                            <div data-link={`/post/${post.id}`} className="pe-2">
                                <Link to={`/user/${post.User?.id}`}>
                                    <img className="rounded-circle border border-3" width={54} alt={`profile picuture ${'qsd'}`}
                                        src={post.User?.profilePicture || defautlAvatar}
                                        data-holder-rendered="true" />
                                </Link>
                            </div>
                            <div className="d-flex flex-column ms-2 w-100">
                                <div data-link={`/post/${post.id}`} className="text-start pb-3">
                                    <Link className="fw-bold text-capitalize link-dark" data-bs-dismiss="modal"
                                        to={`user/${post.User?.id}`} onClick={() => navigate(`user/${post.User?.id}`)}>
                                        {`${post.User?.firstName} ${post.User?.lastName}`}
                                    </Link>
                                </div>

                                <Link className=" text-decoration-none" to={`/post/${post.id}`}
                                    onClick={() => navigate(`/post/${post.id}`)} data-bs-dismiss="modal">
                                    <p className="pe-4 pb-3 m-0  text-break text-body text-start">{post.content}</p>
                                </Link>
                            </div>
                        </div>
                        <Editor editorContext={editorContext} emojiTriggerContext={editorContext} placeholder="Réagissez à ce post" handleSubmit={SubmitComment} />
                    </div>
                    <div className="modal-footer">
                        <button id="comment-modal-close" type="button" className="btn btn-primary rounded-2 shadow" data-bs-dismiss="modal">
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CommentModal