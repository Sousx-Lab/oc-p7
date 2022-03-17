import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Editor from "../components/Editor";
import PostsCard from "../components/PostsCard";

const HomePage = () => {

    const { user } = useContext(UserContext)    
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 mx-auto mb-3 border">
                    <Editor />
                </div>
            </div>
            <PostsCard />
        </div>
    )
}

export default HomePage;