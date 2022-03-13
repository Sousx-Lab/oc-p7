import React, { useCallback, useContext, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { UserContext } from "../contexts/UserContext";
import media from '../assets/img/media.svg'

const Editor = () => {
    const { user } = useContext(UserContext);
    const [post, setPost] = useState({
        content: "",
        media: {
            file: null,
            type: null
        }
    });

    const onDrop = useCallback(uploadedFiles => {
        uploadedFiles.forEach(file => {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPost({ ...post, media: { file: reader.result, type: file.type } });
            }
            if (file) {
                reader.readAsDataURL(file);
            }
        });
    },[])

    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        maxFiles: 1,
        accept: '.jpeg,.jpg,.png,.gif,.webp,.webm',
        onDrop
    });

    const fileError = fileRejections.reduce((_, errors) => {
        if (errors.errors[0].code === "file-invalid-type") {
            return (
                <div className="text-danger pt-2">{errors.errors[0].message}</div>
            )
        }
        if (errors.errors[0].code === "too-many-files") {
            return (
                <div className="text-danger pt-2">{errors.errors[0].message}</div>
            )
        }
    }, "")

    const handleDeleteUpload = () => {
        setPost({ ...post.media, media: { file: null, type: null } })
    }

    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget;
        setPost({ ...post, [name]: value });
    }

    /**
     * @param {Event} event 
     * //Todo finir la création de post
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
    }
    return (
        <div className="row mx-auto border-bottom border-light mt-3 pb-2">
            <div className="col-2 text-center p-0">
                <img className="rounded-circle" width={60} alt={`profile picuture ${user.firstName}`}
                    src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
                    data-holder-rendered="true" />
            </div>
            <div className="col-10 d-flex-row p-0">
                <form onSubmit={handleSubmit} >
                    <div className="">
                        <textarea type="text" onChange={handleChange} value={post.content} name="content"
                            className="form-control form-control-lg border-0 rounded ps-2"
                            placeholder="Quoi de neuf ?"
                            autoComplete="false"
                        />
                    </div>
                    {post.media.file && (
                        <div className="col-10 alert alert-dismissible w-100 mt-1 p-0">
                            <button type="button" onClick={handleDeleteUpload} className="bg-danger btn-danger btn-close p-2"></button>

                            {post.media.type.split('/')[0] === "image" && (
                                <img className="image-responsive w-100" height="auto" alt="100x100" src={post.media.file} />
                            )}

                            {post.media.type.split('/')[0] === "video" && (
                                <video className="w-100" controls >
                                    <source src={post.media.file} type={post.media.type}></source>
                                </video>
                            )}
                        </div>
                    )}
                    <div className="d-flex mt-2 bd-highlight" >
                        <div className="bd-highlight" {...getRootProps()}>
                            <input {...getInputProps()} className="form-control" type="file" name="media" />
                            <div>
                                <img src={media} width={32} alt="upload image or video" />
                                {fileError}
                            </div>
                        </div>

                        <div className="ms-auto bd-highlight">
                            <button disabled={post.content || post.media.file ? false : true}
                                type="submit"
                                className="btn btn-primary btn-sm">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Editor