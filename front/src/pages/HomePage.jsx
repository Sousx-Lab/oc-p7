import React, { useState, useEffect } from "react";
import Editor from "../components/editor/Editor";
import { useQuery } from 'react-query';
import { getAll, deletePost } from "../services/Api/post/postsApi";
import PostsCard from "../components/post/PostsCard";
import { createPost } from "../services/Api/post/postsApi";
import { toast } from "react-toastify";
import { PublicationContext } from "../contexts/PublicationContext";

const HomePage = () => {

    const [posts, setPosts] = useState([]);
    const [publication, setPublication] = useState('')
    // const [newPost, setNewPost] = useState(null);
    const { isLoading } = useQuery('Posts', () => getAll(), {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setPosts(data);
        },
        onError(err) {
            toast.error("Une erreur s'est produite lors du chargement !...");
        }
    })

    /**
     * @param {SubmitEvent} event
     * @returns {boolean}
     */
    const handleSubmit = async (event, data) => {
        event.preventDefault();
        const form = new FormData(event.target);
        if (data.media.fileBlob) {
            form.set('media', data.media.fileBlob);
        }
        const response = await createPost(form);
        if (response.ok) {
            let post = await response.json();
            setPosts([post, ...posts]);
            return response.ok;
        } else {
            toast.error("Une erreur s'est produite lors de la création du post");
        }
    }

    const [deleteLoader, setDeleteLoader] = useState(null)
    const DeletePost = async (id) => {
        setDeleteLoader( id)
        try {
            await deletePost(id);
            toast.success("Post supprimé avec succès");
            setDeleteLoader(null);
            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            setDeleteLoader(null)
            toast.error("Une erreur est survenue lors de la suppression du post");
        }

    }

    useEffect(() => {
        document.title = "Groupomania"
    }, []);
    return (
        <main className="container" role="main">
            <div className="row mx-auto d-flex justify-content-center mt-2">
                <div className="col-lg-8 col-xl-6 col-sm-12 mb-3 border">
                    <Editor editorContext={'post'} emojiTriggerContext={"post"} handleSubmit={handleSubmit} />
                </div>
            </div>
            <PublicationContext.Provider value={{ publication, setPublication }} >
                <PostsCard fetchedPosts={posts} isLoading={isLoading} handleDelete={DeletePost} deleteLoader={deleteLoader} />
            </PublicationContext.Provider>
        </main>
    )
}

export default HomePage;