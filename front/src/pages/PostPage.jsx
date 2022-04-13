import React, { useState, useEffect, useContext } from "react";
import { useQuery } from 'react-query';
import { useParams, Link } from "react-router-dom";
import { getPostById } from "../services/Api/post/postsApi";
import Loader from "../components/layout/Loader";
import { toast } from 'react-toastify';
import UserPopOver from '../components/post/UserPopOver';
import MoreOptionsMenu from '../components/MoreOptionsMenu';
import MediaType from '../components/MediaType';
import { CommentSvg, ArrowLeftSvg } from '../components/IconsSvg';
import defautlAvatar from '../assets/img/d-avatar.svg';
import SharePostMenu from "../components/post/SharePostMenu";
import { dateDiff } from '../services/outils/dateHandler';
import Editor from "../components/editor/Editor";
import LikesPost from "../components/post/LikesPost";
import { createComment } from "../services/Api/commentary/commentsApi";


const PostPage = () => {

    const [post, setPost] = useState({});
    const { id } = useParams();
    
    console.log(location)
    const { isLoading } = useQuery(['Posts', id], () => getPostById(id), {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setPost(data);
        },
        onError(error) {
            toast.error("Une erreur s'est produite lors du chargement !...");
        },
    });

    const handleSubmitComment = async (event, data) => {
        event.preventDefault();
        const form = new FormData(event.target);
        if(data.media.fileBlob){
            form.set('media', data.media.fileBlob);
        }
        try {
            const response = await createComment(post?.id, form);
            if(response.ok){
               let newComment = await response.json();
               setPost({...post, Comments: [newComment, ...post.Comments]});
               return response.ok
            }
        } catch (error) {
            toast.error("Une erreur s'est produite lors de la création du commentaire");
        }
    }
    useEffect(() => {
        document.title =
            `${post.User?.firstName} ${post.User?.lastName} sur Groupomania: "${post.content?.slice(0, 15)}..."`;
    }, [!isLoading]);

    const editorContext = "commentary";
    return (
        <div className="container">
            <div className="row mx-auto d-flex justify-content-center col-md-6 col-sm-12 border-bottom border-top mt-1 border-light">
            {/* post */ }
                {post.id && (
                    <>
                        <article className="border-start border-end border-1 ">
                            <div className="mt-3">
                                <Link to="#" className="rounded-circle bg-grey-hover icon-nav" style={{ padding: "0.5rem 0.4rem" }} 
                                    onClick={() => window.history.back()}>
                                    <ArrowLeftSvg strokeWidth="1" size={26} />
                                </Link>
                            </div>
                            <div className="d-flex mb-3 mt-4 position-relative">
                                <div className="pe-2">
                                    <Link to={`../user/${post.User.id}`}
                                        className="d-block overflow-auto "
                                        data-popover="true">
                                        <img className="rounded-circle border border-3" width={54} 
                                            alt={`photo de profile de ${post.User.firstName} ${post.User.lastName}`}
                                            src={post.User.profilePicture || defautlAvatar}
                                            data-holder-rendered="true" />
                                    </Link>
                                </div>
                                <div className="d-flex flex-column ms-2 w-100">
                                    <div className="text-start pb-3">
                                        <Link to={`../user/${post.User.id}`}
                                            className="fw-bold text-capitalize link-dark"
                                            data-popover="true">
                                            {`${post.User.firstName} ${post.User.lastName}`}
                                        </Link>
                                        <div className="d-inline text-muted fs-6 ps-2"><small>- {dateDiff(post.createdAt)}</small></div>
                                        <UserPopOver id={post.User.id} user={post.User} />
                                    </div>
                                    <MoreOptionsMenu postId={post.id} postUserId={post.User.id} />

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
                                        <SharePostMenu post={post} />
                                    </div>
                                </div>
                            </div>
                        </article>
                        <div className="border pt-3 pb-3">
                            <Editor editorContext={editorContext} emojiTriggerContext={editorContext} 
                                placeholder="Réagissez à ce post" handleSubmit={handleSubmitComment} />
                        </div>
                        {/* End Post */ }
                        
                        {/* Commentaries */ }
                        {post.Comments.map((comment, key) => {
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
                                        <div className="d-flex flex-column ms-2">
                                            <div className="text-start pb-3">
                                                <Link to={`../user/${comment.User.id}`}
                                                    className="fw-bold text-capitalize link-dark"
                                                    data-popover="true">
                                    
                                                    {`${comment.User.firstName} ${comment.User.lastName}`}
                                                </Link>
                                                <div className="d-inline text-muted fs-6 ps-2"><small>- {dateDiff(comment.createdAt)}</small></div>
                                                <UserPopOver id={comment.User.id} user={comment.User} />
                                            </div>
                                            <MoreOptionsMenu postId={comment.id} postUserId={comment.User.id}/>
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
                        })}
                    </>
                )}
                {isLoading && <Loader />}
            </div>
        </div>
    )
}

export default PostPage;