import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loader from '../layout/Loader';
import defautlAvatar from '../../assets/img/d-avatar.svg';
import CommentModal from "./CommentModal";
import UserPopOver from "./UserPopOver";
import MediaType from "../MediaType";
import { CommentSvg } from "../IconsSvg";
import MoreOptionsMenu from "../MoreOptionsMenu";
import { dateDiff } from "../../services/outils/dateHandler";
import SharePostMenu from "./SharePostMenu";
import LikesPost from "./LikesPost";
import EditPublicationModal from "../EditPublicationModal";
import ConfiramtionDeleteModal from "../ConfiramtionDeleteModal";
import { PublicationContext } from "../../contexts/PublicationContext";
import { updatePost } from '../../services/Api/post/postsApi';
import { toast } from "react-toastify";

const PostsCard = ({ fetchedPosts = [], isLoading = true, handleDelete, deleteLoader }) => {

    const navigate = useNavigate()
    const { publicationId } = useContext(PublicationContext);
    const [posts, setPosts] = useState([]);
    /**
     * @param {Event} event
     */
    const postLink = (event) => {
        if (event.target.dataset.link) {
            navigate(event.target.dataset.link)
        }
    }
    const [modalPost, setModalPost] = useState({});
    
    /**
     * @param {SubmitEvent} event
     * @returns {boolean}
     */
    const handleUpdate = async (id, data) => {
        try {
            const reponse = await updatePost(id, data);
            let post = await reponse.json()
            fetchedPosts = fetchedPosts.map(p => p.id !== post.id ? p : post);
            setPosts(fetchedPosts);
            return reponse.ok;
        } catch (error) {
            toast.error("Une erreur est survenue lors de la mise à jour du post");
        }
    }

    useEffect(() => {
        setPosts(fetchedPosts);
    }, [fetchedPosts])
    return (
        <>
            <CommentModal post={modalPost} />
            <ConfiramtionDeleteModal handleDelete={handleDelete} />
            <EditPublicationModal handleUpdate={handleUpdate} />
            {(isLoading) ? (
                <Loader width="3" height="3" />
            ) : (
                <>
                    {posts.length > 0 && posts.map((post, key) => {
                        return (
                            <div key={key} className="row mx-auto d-flex justify-content-center col-lg-8 col-xl-6 col-sm-12 border-bottom border-top border-light">
                                <article className="border-start border-end border-1 bg-light-hover cursor-pointer"
                                    data-link={`/post/${post.id}`}
                                    onClick={postLink} >
                                    {/* User Info */}
                                    <div id={`post-${post.id}`} className="d-flex mb-3 mt-4 position-relative">
                                        <div data-link={`/post/${post.id}`} className="pe-2">
                                            <Link to={`/user/${post.User.id}`}
                                                className="d-block overflow-auto "
                                                data-popover="true">
                                                <img className="rounded-circle border border-3" width={54} alt={`photo de profile de ${post.User.firstName} ${post.User.lastName}`}
                                                    src={post.User.profilePicture || defautlAvatar}
                                                    data-holder-rendered="true" />
                                            </Link>
                                        </div>
                                        <div className="d-flex flex-column ms-2 w-100">
                                            <div data-link={`/post/${post.id}`} className="text-start pb-3">
                                                <UserPopOver user={post.User} keyId={key} />
                                                <div className="d-inline text-muted fs-6 ps-2"><small>- {dateDiff(post.createdAt)}</small></div>
                                            </div>
                                            {deleteLoader === post.id ? (
                                                <div className="position-absolute" style={{ left: '95%' }}>
                                                    <Loader width="1.2" height="1.2" />
                                                </div>
                                            ) : (
                                                <MoreOptionsMenu publication={post} publicationUserId={post.User.id} />
                                            )}

                                            {/* End User Info */}

                                            {/* Post Content */}
                                            <Link className=" text-decoration-none" to={`/post/${post.id}`}>
                                                <p className="pe-4 pb-3 m-0 text-break text-body text-start">{post.content}</p>
                                            </Link>
                                            {post.media && (
                                                <MediaType mediaType={post.mediaType} media={post.media} id={key} />
                                            )}
                                            {/* End Post Content */}

                                            {/*  Commentaries & likes  */}
                                            <div data-link={`/post/${post.id}`} className="d-flex justify-content-evenly pb-3 pt-3">
                                                <div className="d-flex align-items-center icon-info" role="button"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#add-comment-modal"
                                                    onClick={() => setModalPost(post)} >

                                                    {/* comments  */}
                                                    <div className="rounded-circle p-2 icon-info--bg cursor-pointer" title="Ajouter un commentaire">
                                                        {<CommentSvg />}
                                                    </div>
                                                    <span className="ps-1 small icon-info--text">
                                                        <small>{post?.commentsCount ? post?.commentsCount.toString(): post.Comments.length.toString()}</small></span>
                                                </div>

                                                {/* likes*/}
                                                <LikesPost usersLiked={post.usersLiked} postId={post.id} />

                                                <SharePostMenu post={post} />
                                            </div>
                                            {/* End Commentaries & likes  */}
                                        </div>
                                    </div>
                                </article>
                            </div>
                        )
                    })
                    }
                </>
            )}
        </>
    )
}

export default PostsCard;