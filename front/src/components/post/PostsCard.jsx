import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from '../../contexts/UserContext';
import { useQuery } from 'react-query';
import { getAll } from "../../services/Api/posts/postsApi";
import Loader from '../layout/Loader';
import defautlAvatar from '../../assets/img/d-avatar.svg';
import CommentModal from "./CommentModal";
import UserPopOver from "./UserPopOver";
import MediaType from "../MediaType";
import { CommentSvg } from "../IconsSvg";
import MoreOptionsMenu from "../MoreOptionsMenu";
import { toast } from 'react-toastify';
import { dateDiff } from "../../services/outils/dateHandler";
import SharePostMenu from "./SharePostMenu";
import LikesPost from "./LikesPost";


const PostsCard = ({ newPost = null}) => {

    const { user } = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const { isLoading } = useQuery('Posts', () => getAll(), {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setPosts(data);
        },
        onError(err) {
            toast.error("Une erreur s'est produite lors du chargement !...");
        }
    })
    const navigate = useNavigate()
    /**
     * @param {Event} event
     */
    const postLink = (event) => {
        if (event.target.dataset.link) {
            navigate(event.target.dataset.link)
        }
    }
    const [modalPost, setModalPost] = useState({});
    const [popOver, setPopOver] = useState(false);

    const handlePopOver = async (id) => {
        setPopOver(true)
        let userPop = document.getElementById(`user-pop-${id}`)
        if (userPop && !popOver) {
            setTimeout(() => {
                if (userPop.classList.contains('d-none')) {
                    userPop.classList.remove('d-none')
                    userPop.classList.add('d-block')
                }
                return;
            }, 800);
        }
    }

    const handlePopOverLeave = (id) => {
        setPopOver(false)
        let userPop = document.getElementById(`user-pop-${id}`)
        if (userPop && popOver) {
            setTimeout(() => {
                if (userPop.classList.contains('d-block')) {
                    userPop.classList.remove('d-block')
                    userPop.classList.add('d-none')
                }
                return;
            }, 800)
        }
    }
    useEffect(() =>{
        if(newPost){
            setPosts([newPost, ...posts])
        };
    },[newPost])
    return (
        <>
            <CommentModal post={modalPost} />
            {posts.map((post, key) => {
                return (
                    <div key={key} className="row mx-auto d-flex justify-content-center col-lg-6 col-sm-12 border-bottom border-top border-light">
                        <article className="border-start border-end border-1 bg-light-hover cursor-pointer"
                            data-link={`/post/${post.id}`}
                            onClick={postLink} >
                            {/* User Info */}
                            <div id={`post-${post.id}`} className="d-flex mb-3 mt-4 position-relative">
                                <div data-link={`/post/${post.id}`} className="pe-2">
                                    <Link to={`/user/${post.User.id}`}
                                        className="d-block overflow-auto "
                                        data-popover="true">
                                        <img className="rounded-circle" width={54} alt={`photo de profile de ${post.User.firstName} ${post.User.lastName}`}
                                            src={post.User.profilePicture || defautlAvatar}
                                            data-holder-rendered="true" />
                                    </Link>
                                </div>
                                <div className="d-flex flex-column ms-2 w-100">
                                    <div data-link={`/post/${post.id}`} className="text-start pb-3">
                                        <Link to={`user/${post.User.id}`}
                                            className="fw-bold text-capitalize link-dark text-decoration-none"
                                            data-popover="true"
                                            onMouseEnter={() => handlePopOver(post.User.id)}
                                            onMouseLeave={() => handlePopOverLeave(post.User.id)}
                                        >
                                            {`${post.User.firstName} ${post.User.lastName}`}
                                        </Link>
                                        <div className="d-inline text-muted fs-6 ps-2"><small>- {dateDiff(post.createdAt)}</small></div>
                                        <UserPopOver user={post.User} />
                                    </div>
                                    <MoreOptionsMenu post={post} />

                                    {/* End User Info */}
                                    <Link className=" text-decoration-none" to={`/post/${post.id}`}>
                                        <p className="pe-4 pb-3 m-0 text-break text-body text-start">{post.content}</p>
                                    </Link>
                                    {post.media && (
                                        <MediaType mediaType={post.mediaType} media={post.media} id={key} />
                                    )}
                                    {/*  Commentaries & likes  */}
                                    <div data-link={`/post/${post.id}`} className="d-flex justify-content-evenly pb-3 pt-3">
                                        <div className="d-flex align-items-center icon-info" role="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#commentModal"
                                            onClick={() => setModalPost(post)} >

                                            {/* comments  */}
                                            <div className="rounded-circle p-2 icon-info--bg cursor-pointer" title="Ajouter un commentaire">
                                                {<CommentSvg />}
                                            </div>
                                            <span className="ps-1 small icon-info--text"><small>{post.commentsCount.toString()}</small></span>
                                        </div>

                                        {/* likes*/}
                                        <LikesPost usersLiked={post.usersLiked} postId={post.id} />

                                        <SharePostMenu post={post} />
                                    </div>
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