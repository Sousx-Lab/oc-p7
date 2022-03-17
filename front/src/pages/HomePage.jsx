import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Editor from "../components/Editor";
import PostsCard from "../components/PostsCard";

const HomePage = () => {

    const { user } = useContext(UserContext)    
    return (
        <div className="container">
            <div className="row mx-auto d-flex justify-content-center">
                    <Editor />
            </div>
            <PostsCard />
        </div>
    )
}

export default HomePage;