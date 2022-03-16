import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from 'react-query';
import { getAll } from "../services/Api/posts/postsApi";
import FullScreenLoader from '../components/FullScreenLoader';
import defautlAvatar from '../assets/img/d-avatar.svg'
import { toast } from 'react-toastify'
const PostCard = () => {

    const {isLoading, error, data } = useQuery('Posts', () => getAll(), {
        refetchOnWindowFocus: false,
        staleTime: 60000
    })
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        if(error){
            toast.error("Une erreur s'est produite lors du chargement...")
        }
        if(data){
            setPosts(data)
        }
    },[isLoading])
    return (
        <>
        {posts.map((post, key) => {
        return (
            <div key={key} className="row">
                <div className="col-lg-6 mx-auto border bg-light">
                <Link className="text-decoration-none" to={`post/${post.id}`}>
                    <div className="d-flex text-center pb-3 pt-3 ">
                        <div className="pe-2">
                        <Link to={`/user/${post.User.id}`}>
                            <img className="rounded-circle" width={54} alt={`profile picuture ${'qsd'}`}
                                src={post.User.profilePicture || defautlAvatar}
                                data-holder-rendered="true" />
                            </Link>
                        </div>
                        <div className="d-flex flex-column ms-2">
                            <div className="text-start pb-2">
                                <Link className="fw-bold text-capitalize" to={`user/${post.User.id}`}>{`${post.User.firstName} ${post.User.lastName}`}</Link>
                            </div>
                                <p className="me-4 mt-1 text-break text-body text-start">{post.content}</p>
                            <div></div>
                        </div>
                    </div>
                </Link>
                </div>
            </div>
            )
        })}
        {isLoading && (
            <FullScreenLoader />
        )}
        </>
    )
}

export default PostCard;