import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Editor from "../components/Editor";

const HomePage = () => {
    const post = {

    }
    const { user } = useContext(UserContext)
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 mx-auto">
                    <Editor />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 mx-auto">
                    <div className="card border-light">
                        <div className="card-body">
                            <h4 className="card-title">Card title</h4>
                            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="card-link">Card link</a>
                            <a href="#" className="card-link">Another link</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;