import React, { useContext, useEffect, useState } from "react";
import { UserContext } from '../contexts/UserContext';
import { Link } from "react-router-dom";
import { useQuery } from 'react-query';
import { getAll } from "../services/Api/posts/postsApi";
import Loader from './Loader';
import defautlAvatar from '../assets/img/d-avatar.svg';
import { useNavigate } from "react-router-dom";
import CommentModal from "./CommentModal";
import { toast } from 'react-toastify';

const PostsCard = () => {

    const { user } = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const { isLoading, error, data } = useQuery('Posts', () => getAll(), {
        refetchOnWindowFocus: false,
        staleTime: 60000
    })

    useEffect(() => {
        if (error) {
            toast.error("Une erreur s'est produite lors du chargement!...")
        }
        if (data) {
            setPosts(data)
        }
    }, [isLoading])

    /**
     * @param {string} mediaType 
     * @param {string} media
     */
    const handlePostMedia = (mediaType, media) => {

    }

    const navigate = useNavigate()
    /**
     * 
     * @param {Event} event
     */
    const postLink = (event) => {
        if (event.target.dataset.link) {
            navigate(event.target.dataset.link)
        }
    }

    const [modalPost, setModalPost] = useState({});

    return (
        <>
            <CommentModal post={modalPost} />
            {posts.map((post, key) => {
                return (
                    <div key={key} className="row mx-auto d-flex justify-content-center">
                        <article className="col-lg-6 col-sm-12 border border-light bg-light-hover position-relative cursor-pointer"
                            data-link={`/post/${post.id}`}
                            onClick={postLink}
                        >
                            {/* User Info */}
                            <div className="d-flex text-center mb-3 mt-4">
                                <div data-link={`/post/${post.id}`} className="pe-2">
                                    <Link to={`/user/${post.User.id}`}>
                                        <img className="rounded-circle" width={54} alt={`profile picuture ${'qsd'}`}
                                            src={post.User.profilePicture || defautlAvatar}
                                            data-holder-rendered="true" />
                                    </Link>
                                </div>

                                <div className="d-flex flex-column ms-2">
                                    <div data-link={`/post/${post.id}`} className="text-start pb-3">
                                        <Link className="fw-bold text-capitalize link-dark"
                                            to={`user/${post.User.id}`}>
                                            {`${post.User.firstName} ${post.User.lastName}`}
                                        </Link>
                                    </div>
                                    <Link className=" text-decoration-none" to={`/post/${post.id}`}>
                                        <p className="pe-4 pb-3 m-0  text-break text-body text-start">{post.content}</p>
                                    </Link>
                                </div>
                            </div>
                            {/* End User Info */}

                            {/*  Commentaries & likes  */}
                            <div data-link={`/post/${post.id}`} className="d-flex justify-content-evenly pb-3">
                                <div className="d-flex align-items-center icon-info" role="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#commentModal"
                                    onClick={() => setModalPost(post)}
                                >
                                    {/* comments  */}
                                    <div className="rounded-circle p-2 icon-info--bg cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                                            fill="none" stroke="#000000" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                    </div>
                                    <span className="ps-1 small icon-info--text"><small>{post.commentsCount.toString()}</small></span>
                                </div>

                                {/* likes*/}
                                <div className="d-flex align-items-center icon-like cursor-pointer">
                                    {post.usersLiked.includes(user.userId) ? (
                                        <>
                                            <div className="rounded-circle icon-like--bg-active p-2" >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                                                    fill="#e02727" stroke="none" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                            </div>
                                            <span className="ps-1 small icon-like--text-active"><small>{post.likes}</small></span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="rounded-circle icon-like--bg p-2" >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                                                    fill="none" stroke="#6c6a6a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                            </div>
                                            <span className="ps-1 small icon-like--text"><small>{post.likes}</small></span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </article>
                    </div>
                )
            })}
            {isLoading && (
                <Loader />
            )}

        </>
    )
}

export default PostsCard;