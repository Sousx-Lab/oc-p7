import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';
import { getUserById } from "../services/Api/user/usersApi";
import { toast } from 'react-toastify'
import defautlAvatar from '../assets/img/d-avatar.svg';
import { ArrowLeftSvg, CommentSvg } from '../components/IconsSvg';
import { dateDiff } from '../services/outils/dateHandler';
import MoreOptionsMenu from '../components/MoreOptionsMenu';
import MediaType from '../components/MediaType';
import LikesPost from '../components/post/LikesPost';
import SharePostMenu from '../components/post/SharePostMenu';


const UserPage = () => {

    const { id } = useParams();
    const [user, setUser] = useState({});

    const { isLoading } = useQuery(['User', id], () => getUserById(id), {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setUser(data);
        },
        onError: (error) => {
            toast.error("Une erreur s'est produite lors du chargement !...");
        }
    })
    const navigate = useNavigate();

    const postLink = (event) => {
        if (event.target.dataset.link) {
            navigate(event.target.dataset.link)
        }
    }
    return (
        <div className="container pb-5">
            {user.id && (
                <>
                    <div className="row col-sm-12 col-md-8 col-xl-6 mx-auto pb-5 mt-1 bg-light-hover border border-1">
                        <div className="mt-3 mb-3">
                            <Link className="rounded-circle bg-grey-hover icon-nav" to={`/`} style={{ padding: "0.5rem 0.4rem" }}>
                                <ArrowLeftSvg strokeWidth="1" size={26} />
                            </Link>
                        </div>
                        <div className="d-block overflow-auto">
                            <img className="rounded-circle mb-1 border border-3" width={64} alt={`profile picuture`}
                                src={user.profilePicture || defautlAvatar}
                                data-holder-rendered="true" />
                        </div>
                        <div className="d-block text-capitalize fw-bold text-break mb-3 text-decoration-none link-dark">
                            {`${user.firstName} ${user.lastName}`}
                        </div>
                        <p className="text-break col-xl-6 col-sm-10 mb-1">{user?.bio || ""}</p>
                        <div className="text-muted fs-6">
                            <small> Inscrit depuis le {new Date(user.createdAt).toLocaleDateString()}</small>
                        </div>
                    </div>
                    {user.Posts.map((post, key) => (
                        <div className="row col-sm-12 col-md-8 col-xl-6 mx-auto bg-light-hover" key={key}>
                            <article className="border-start border-end border-1 cursor-pointer" data-link={`/post/${post.id}`}
                                onClick={postLink}>
                                <div className="d-flex mb-3 mt-4 position-relative">
                                    <div className="pe-2" data-link={`/post/${post.id}`}>
                                        <Link className="d-block overflow-auto" to={`/user/${user.id}`}
                                            data-popover="true">
                                            <img className="rounded-circle border border-3" width={54}
                                                alt={`photo de profile de ${user.firstName} ${user.lastName}`}
                                                src={user.profilePicture || defautlAvatar}
                                                data-holder-rendered="true" />
                                        </Link>
                                    </div>
                                    <div className="d-flex flex-column ms-2 w-100">
                                        <div className="text-start pb-3" data-link={`/post/${post.id}`}>
                                            <Link to={`../user/${user.id}`}
                                                className="fw-bold text-capitalize link-dark"
                                                data-popover="true">
                                                {`${user.firstName} ${user.lastName}`}
                                            </Link>
                                            <div className="d-inline text-muted fs-6 ps-2"><small>- {dateDiff(post.createdAt)}</small></div>
                                        </div>
                                        <MoreOptionsMenu postId={post.id} postUserId={user.id} />

                                        {/* End User Info */}
                                        <Link className=" text-decoration-none" to={`/post/${post.id}`} >
                                            <p className="pe-4 pb-3 m-0 text-break text-body text-start">{post.content}</p>
                                        </Link>
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
                                                <span className="ps-1">{post.commentsCount.toString()}</span>
                                            </div>

                                            {/* likes*/}
                                            <LikesPost usersLiked={post.usersLiked} postId={post.id} />
                                            <SharePostMenu post={post} />
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    ))}
                </>
            )}

        </div>
    );
}

export default UserPage;