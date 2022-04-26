import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';
import { getUserById } from "../services/Api/user/usersApi";
import { deletePost, updatePost } from "../services/Api/post/postsApi";
import { toast } from 'react-toastify'
import defautlAvatar from '../assets/img/d-avatar.svg';
import { ArrowLeftSvg, CommentSvg, SettingsSvg } from '../components/IconsSvg';
import { dateDiff } from '../services/outils/dateHandler';
import MoreOptionsMenu from '../components/MoreOptionsMenu';
import MediaType from '../components/MediaType';
import LikesPost from '../components/post/LikesPost';
import SharePostMenu from '../components/post/SharePostMenu';
import { PublicationContext } from "../contexts/PublicationContext";
import ConfiramtionDeleteModal from "../components/ConfiramtionDeleteModal";
import ConfirmationDeleteUserModal from "../components/ConfirmationDeleteUserModal";
import EditPublicationModal from "../components/EditPublicationModal";
import Loader from '../components/layout/Loader';
import { UserContext } from "../contexts/UserContext";
import EditUserProfilModal from "../components/EditUserProfilModal";
import CommentModal from "../components/post/CommentModal";

const UserPage = () => {

    const [publication, setPublication] = useState('')
    const { user } = useContext(UserContext)
    const { id } = useParams();
    const [userData, setUserData] = useState({});

    const { isLoading } = useQuery(['User', id], () => getUserById(id), {
        refetchOnWindowFocus: false,
        onSuccess: data => {
            setUserData(data);
        },
        onError: error => {
            toast.error("Une erreur s'est produite lors du chargement !...");
        }
    })
    const navigate = useNavigate();

    const postLink = (event) => {
        if (event.target.dataset.link) {
            navigate(event.target.dataset.link)
        }
    }
    const [deleteLoader, setDeleteLoader] = useState(null)
    const DeletePost = async (id) => {
        setDeleteLoader(id)
        try {
            await deletePost(id);
            toast.info("Post supprimé avec succès");
            setDeleteLoader(null);
            setUserData({ ...userData, Posts: userData.Posts.filter(post => post.id !== id) });
        } catch (error) {
            setDeleteLoader(null);
            toast.error("Une erreur est survenue lors de la suppression du post");
        }
    }

    /**
     * @param {SubmitEvent} event
     * @returns {boolean}
     */
     const handleUpdate = async (id, data) => {
        try {
            const reponse = await updatePost(id, data);
            let post = await reponse.json()
            setUserData({ ...userData, Posts: userData.Posts.map(p => p.id !== post.id ? p : post) });
            return reponse.ok;
        } catch (error) {
            toast.error("Une erreur est survenue lors de la mise à jour du post");
        }
    }
    const [modalPost, setModalPost] = useState({});

    const [updatedData, setUpdatedData] = useState('')
    useEffect(() => {
        document.title =
            `${userData?.firstName} ${userData?.lastName} sur Groupomania`;
    }, [userData]);

    useEffect(() => {
        if (updatedData.id) {
            setUserData(updatedData)
        }

    }, [updatedData])
    return (
        <div className="container pb-5">
            <CommentModal
                post={
                    {id: modalPost.id, 
                    content: modalPost.content, 
                    User: {
                        id: userData.id,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        profilePicture: userData.profilePicture
                    }}}
             />
            <ConfirmationDeleteUserModal userId={userData.id} />
            {userData.id && (
                <>
                    <div className="row col-sm-12 col-md-8 col-xl-6 mx-auto pb-5 bg-light bg-gradient border border-1">
                        <div className="mt-3 mb-3">
                            <Link to="#" className="rounded-circle bg-grey-hover icon-nav" style={{ padding: "0.5rem 0.4rem" }}
                                onClick={() => window.history.back()}>
                                <ArrowLeftSvg strokeWidth="1" size={26} />
                            </Link>
                            {(userData.id === user.id || user.roles.includes('ROLE_ADMIN')) && (
                                <>
                                    <button type="button" className="btn btn-sm btn-primary rounded-2 float-end mt-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit-profil-modal">
                                        Editer profil
                                        <i className="ps-1"><SettingsSvg size={"18"} stroke={'#ffff'} /></i>
                                    </button>
                                    <EditUserProfilModal userProperties={userData} setUpdatedData={setUpdatedData} />
                                </>
                            )}
                        </div>
                        <div className="d-block overflow-auto">
                            <img className="rounded-circle mb-1 border border-3 border-primary" width={64} alt={`profile picuture`}
                                src={userData.profilePicture || defautlAvatar}
                                data-holder-rendered="true" />
                        </div>
                        <div className="d-block text-capitalize fw-bold text-break mb-3 text-decoration-none link-dark">
                            {`${userData.firstName} ${userData.lastName}`}
                            <small className="fw-lighter badge bg-primary text-wrap ms-2">{userData?.roles.includes('ROLE_ADMIN') && ('admin')}</small>
                        </div>
                        
                        <p className="text-break col-xl-6 col-sm-10 mb-1">{userData?.bio || ""}</p>
                        <div className="text-muted fs-6">
                            <small> Inscrit depuis le {new Date(userData.createdAt).toLocaleDateString()}</small>
                        </div>

                    </div>
                    {/* End User Info */}

                    <PublicationContext.Provider value={{ publication, setPublication }} >
                        <ConfiramtionDeleteModal handleDelete={DeletePost} />
                        <EditPublicationModal handleUpdate={handleUpdate}/>
                        {userData.Posts.map((post, key) => (
                            <div key={key} className="row col-sm-12 col-md-8 col-xl-6 mx-auto bg-light-hover" >
                                <article className="border-start border-end border-1 border-bottom cursor-pointer" data-link={`/post/${post.id}`}
                                    onClick={postLink}>
                                    <div className="d-flex mb-3 mt-4 position-relative">
                                        <div className="pe-2" data-link={`/post/${post.id}`}>
                                            <Link className="d-block overflow-auto" to={`/user/${userData.id}`}
                                                data-popover="true">
                                                <img className="rounded-circle border border-3" width={54}
                                                    alt={`photo de profile de ${userData.firstName} ${userData.lastName}`}
                                                    src={userData.profilePicture || defautlAvatar}
                                                    data-holder-rendered="true" />
                                            </Link>
                                        </div>
                                        <div className="d-flex flex-column ms-2 w-100">
                                            <div className="text-start pb-3" data-link={`/post/${post.id}`}>
                                                <Link to={`../user/${userData.id}`}
                                                    className="fw-bold text-capitalize link-dark"
                                                    data-popover="true">
                                                    {`${userData.firstName} ${userData.lastName}`}
                                                </Link>
                                                <div className="d-inline text-muted fs-6 ps-2"><small>- {dateDiff(post.createdAt)}</small></div>
                                            </div>
                                            {deleteLoader === post.id ? (
                                                <div className="position-absolute" style={{ left: '95%' }}>
                                                    <Loader width="1.2" height="1.2" />
                                                </div>
                                            ) : (
                                                <MoreOptionsMenu publication={post} publicationUserId={userData.id} />
                                            )}
                                            <Link className=" text-decoration-none" to={`/post/${post.id}`} >
                                                <p className="pe-4 pb-3 m-0 text-break text-body text-start">{post.content}</p>
                                            </Link>
                                            {post.media && (
                                                <MediaType mediaType={post.mediaType} media={post.media} id={post.id} />
                                            )}

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
                                                        <small>{post.commentsCount.toString()}</small></span>
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
                    </PublicationContext.Provider>
                </>
            )}
        </div>
    );
}

export default UserPage;
