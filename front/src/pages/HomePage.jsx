import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Editor from "../components/Editor";
import PostCard from "../components/PostCard";

const HomePage = () => {

    const { user } = useContext(UserContext)    
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 mx-auto mb-3 border">
                    <Editor />
                </div>
            </div>
            <PostCard />
        </div>
    )
}

export default HomePage;