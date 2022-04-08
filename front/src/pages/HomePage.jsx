import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import Editor from "../components/editor/Editor";
import PostsCard from "../components/post/PostsCard";
import { createPost } from "../services/Api/posts/postsApi";
import { toast } from "react-toastify";

const HomePage = () => {

    const { user } = useContext(UserContext)
    useEffect(() => {
        document.title = "Groupomania"
    }, []);

    const [newPost, setNewPost] = useState(null);

    /**
     * @param {SubmitEvent} event
     */
    const handleSubmit = async (event, data) => {
        event.preventDefault();
        const form = new FormData(event.target);
        if(data.media.fileBlob){
            form.set('media', data.media.fileBlob);
        }
        const response = await createPost(form);
        if (response.ok) {
            let post = await response.json();
            setNewPost(post);
            return response.ok;
        } else {
            toast.error("Une erreur s'est produite lors de la création du post");
        }
    }
    return (
        <div className="container">
            <div className="row mx-auto d-flex justify-content-center mt-2">
                <div className="col-lg-6 mb-3 border">
                    <Editor editorContext={'post'} emojiTriggerContext={"post"} handleSubmit={handleSubmit} />
                </div>
            </div>
            <PostsCard  newPost={newPost}/>
        </div>
    )
}

export default HomePage;