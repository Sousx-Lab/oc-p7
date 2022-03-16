import React, { useCallback, useContext, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { UserContext } from "../contexts/UserContext";
import media from '../assets/img/media.svg'
import defautlAvatar from '../assets/img/d-avatar.svg'
const Editor = () => {
    const { user } = useContext(UserContext);
    const [data, setData] = useState({
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
                setData({ ...data.media, media: { file: reader.result, type: file.type } });
            }
            if (file) {
                reader.readAsDataURL(file);
            }
        });
    }, [])

    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        maxFiles: 1,
        accept: '.jpeg,.jpg,.png,.gif,.webp,.webm,.mp4,.mpeg',
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
        setData({ ...data.media, media: { file: null, type: null } })
    }

    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget;
        setData({ ...data, [name]: value });
    }

    /**
     * @param {SubmitEvent} event 
     * //Todo finir la création de data
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
    }

    return (
        <div className="mx-auto pb-2 pt-3 mb-3">
            <div className="d-flex text-center p-0">
                <div className="pe-2">
                    <img className="rounded-circle" width={54} alt={`profile picuture ${user.firstName}`}
                        src={user.profilePicture || defautlAvatar}
                        data-holder-rendered="true" />
                </div>
                <div className="w-100 d-flex-row p-0">
                    <form onSubmit={handleSubmit} >
                        <div className="">
                            <textarea type="text" onChange={handleChange} value={data.content} name="content"
                                className="form-control form-control-lg border-0 rounded ps-2"
                                placeholder="Quoi de neuf ?"
                                autoComplete="false"
                            />
                        </div>
                        {data.media.file && (
                            <div className="col-10 alert alert-dismissible w-100 mt-1 p-0">
                                <button type="button" onClick={handleDeleteUpload} className="bg-danger btn-danger btn-close p-2"></button>

                                {data.media.type.split('/')[0] === "image" && (
                                    <img className="image-responsive w-100" height="auto" alt="100x100" src={data.media.file} />
                                )}

                                {data.media.type.split('/')[0] === "video" && (
                                    <video className="w-100" controls >
                                        <source src={data.media.file} type={data.media.type}></source>
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
                                <button disabled={data.content || data.media.file ? false : true}
                                    type="submit"
                                    className="btn btn-primary btn-sm rounded-2">Poster</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Editor