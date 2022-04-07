import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useQuery } from 'react-query';
import { useParams, Link } from "react-router-dom";
import { getPostById } from "../services/Api/posts/postsApi";
import Loader from "../components/layout/Loader";
import { toast } from 'react-toastify';
import UserPopOver from '../components/post/UserPopOver';
import PostMoreOptions from '../components/post/PostMoreOptions';
import MediaType from '../components/MediaType';
import { CommentSvg, ArrowLeftSvg } from '../components/IconsSvg';
import defautlAvatar from '../assets/img/d-avatar.svg';
import SharePost from '../components/post/SharePost';
import { dateDiff } from '../services/outils/dateHandler';
import Editor from "../components/editor/Editor";
import LikesPost from "../components/post/LikesPost";

const PostPage = () => {

    const { user } = useContext(UserContext)
    const [post, setPost] = useState({});
    const { id } = useParams();

    const { isLoading } = useQuery('Posts', () => getPostById(id), {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setPost(data);
        },
        onError(error) {
            toast.error("Une erreur s'est produite lors du chargement !...");
        },
    });
    useEffect(() => {
        document.title =
            `${post.User?.firstName} ${post.User?.lastName} sur Groupomania: "${post.content?.slice(0, 15)}..."`;
    }, [post.id])
    const editorContext = "commentary";
    return (
        <div className="container">
            <div className="row mx-auto d-flex justify-content-center col-md-6 col-sm-12 border-bottom border-top mt-1 border-light">
                {post.id && (
                    <>
                        <article className="border-start border-end border-1 ">
                            <div className="mt-3">
                                <Link className="rounded-circle bg-grey-hover icon-nav" to={`../#post-${post.id}`} style={{padding: "0.5rem 0.4rem"}}>
                                    <ArrowLeftSvg strokeWidth="1" size={26} />
                                </Link>
                            </div>
                            <div className="d-flex mb-3 mt-4 position-relative">
                                <div className="pe-2">
                                    <Link to={`../user/${post.User.id}`}
                                        className="d-block overflow-auto "
                                        data-popover="true"
                                    // onMouseEnter={() => handlePopOver(key)}
                                    // onMouseLeave={() => handlePopOverLeave(key)}
                                    >
                                        <img className="rounded-circle" width={54} alt={`photo de profile de ${post.User.firstName} ${post.User.lastName}`}
                                            src={post.User.profilePicture || defautlAvatar}
                                            data-holder-rendered="true" />
                                    </Link>
                                </div>
                                <div className="d-flex flex-column ms-2">
                                    <div className="text-start pb-3">
                                        <Link to={`../user/${post.User.id}`}
                                            className="fw-bold text-capitalize link-dark"
                                            data-popover="true"
                                        // onMouseEnter={() => handlePopOver(key)}
                                        // onMouseLeave={() => handlePopOverLeave(key)}
                                        >
                                            {`${post.User.firstName} ${post.User.lastName}`}
                                        </Link>
                                        <div className="d-inline text-muted fs-6 ps-2"><small>- {dateDiff(post.createdAt)}</small></div>
                                        <UserPopOver id={post.User.id} user={post.User} />
                                    </div>
                                    <PostMoreOptions post={post} />

                                    {/* End User Info */}
                                    <div className=" text-decoration-none">
                                        <p className="pe-4 pb-3 m-0 text-break text-body text-start fs-4">{post.content}</p>
                                    </div>
                                    {post.media && (
                                        <MediaType mediaType={post.mediaType} media={post.media} id={post.id} />
                                    )}

                                    {/*  Commentaries & likes  */}
                                    <div data-link={`/post/${post.id}`} className="d-flex justify-content-evenly pb-3 pt-3">
                                        <div className="d-flex align-items-center">
                                            {/* comments  */}
                                            <div className="rounded-circle p-2" title="Nombres de commentaires">
                                                {<CommentSvg />}
                                            </div>
                                            <span className="ps-1">{post.Comments.length.toString()}</span>
                                        </div>

                                        {/* likes*/}
                                        <LikesPost usersLiked={post.usersLiked} postId={post.id} />
                                        <SharePost post={post} />
                                    </div>
                                </div>
                            </div>
                        </article>
                        <div className="border pt-3 pb-3">
                            <Editor editorContext={editorContext} emojiTriggerContext={editorContext} placeholder="Réagissez à ce post" />
                        </div>
                        {post.Comments.map((comment, key) => {
                            return (
                                <div key={key} className="border-start border-end border-bottom border-1 mb-5 pt-4 pb-5 bg-light-hover">
                                    <div className="d-flex position-relative">
                                        <div className="pe-2">
                                            <Link to={`../user/${comment.User.id}`}
                                                className="d-block overflow-auto "
                                                data-popover="true" >
                                                <img className="rounded-circle" width={54} alt={`photo de profile de ${comment.User.firstName} ${comment.User.lastName}`}
                                                    src={comment.User.profilePicture || defautlAvatar}
                                                    data-holder-rendered="true" />
                                            </Link>
                                        </div>
                                        <div className="d-flex flex-column ms-2">
                                            <div className="text-start pb-3">
                                                <Link to={`../user/${comment.User.id}`}
                                                    className="fw-bold text-capitalize link-dark"
                                                    data-popover="true"
                                                // onMouseEnter={() => handlePopOver(key)}
                                                // onMouseLeave={() => handlePopOverLeave(key)}
                                                >
                                                    {`${comment.User.firstName} ${comment.User.lastName}`}
                                                </Link>
                                                <div className="d-inline text-muted fs-6 ps-2"><small>- {dateDiff(comment.createdAt)}</small></div>
                                                <UserPopOver id={comment.User.id} user={comment.User} />
                                            </div>
                                            <PostMoreOptions post={comment} />
                                            <div className=" text-decoration-none">
                                                <p className="pe-4 pb-3 m-0 text-break text-body text-start">{comment.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </>
                )}
                {isLoading && <Loader />}
            </div>
        </div>
    )
}

export default PostPage;