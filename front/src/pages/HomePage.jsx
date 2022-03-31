import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Editor from "../components/editor/Editor";
import PostsCard from "../components/post/PostsCard";

const HomePage = () => {

    const { user } = useContext(UserContext)
    return (
        <div className="container">
            <div className="row mx-auto d-flex justify-content-center mt-2">
                <div className="col-lg-6 mb-3 border">
                    <Editor editorContext={'post'} emojiTriggerContext={"post"} />
                </div>
            </div>
            <PostsCard />
        </div>
    )
}

export default HomePage;