import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { UserContext } from "../../contexts/UserContext";
import { MediasSvg } from "../IconsSvg";
import MediaType from "../MediaType";
import defautlAvatar from '../../assets/img/d-avatar.svg';
import { Link } from 'react-router-dom';
import EmojiPicker from "./EmojiPicker";

const Editor = ({ editorContext, emojiTriggerContext, placeholder = "Quoi de neuf ?" }) => {

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

    const fileAccept = '.jpeg,.jpg,.png,.gif,.webp,.webm,.mp4,.mpeg';
    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        maxFiles: 1,
        multiple: false,
        accept: fileAccept,
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
        setData({ ...data, [currentTarget.name]: currentTarget.value })
    }

    /**
     * @param {SubmitEvent} event 
     * //Todo finir l'envoi du formulaire
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        console.log(form.get('content'))
    }

    return (
        <div className="mx-auto pb-2 pt-3 mb-3">
            <div className="d-flex text-center p-0">
                <div className="pe-2">
                    <Link to={`/user/${user.id}`}>
                        <img className="rounded-circle" width={54} alt={`${user.firstName} ${user.lastName}`}
                            src={user.profilePicture || defautlAvatar}
                            title={`${user.firstName} ${user.lastName}`}
                            data-holder-rendered="true" />
                    </Link>
                </div>
                <div className="w-100 d-flex-row p-0">
                    <form onSubmit={handleSubmit} >
                        <textarea onChange={handleChange} value={data.content} name="content"
                            className="form-control form-control border-0 rounded ps-2 editor-textarea"
                            placeholder={placeholder}
                            autoComplete="false"
                            data-context={editorContext}
                        />
                        {data.media.file && (
                            <div className="col-10 alert alert-dismissible w-100 mt-1 p-0">
                                <button type="button" onClick={handleDeleteUpload} className="bg-danger btn-danger btn-close p-2"></button>
                                <MediaType mediaType={data.media.type} media={data.media.file} />
                            </div>
                        )}
                        <div className="d-flex mt-2 align-items-center" >
                            <div className="d-flex" {...getRootProps()}>
                                <input {...getInputProps()} className="form-control" type="file" name="media" accept={fileAccept} />
                                <div className="icon-info">
                                    <div className="rounded-circle icon-info--bg p-2 text-center" title="Médias">
                                        {<MediasSvg size={24} strokeWidth={"1.5"} stroke={"#74bae9"} />}
                                    </div>
                                    {fileError}
                                </div>
                            </div>
                            <EmojiPicker insertInto={editorContext} TriggerElem={emojiTriggerContext} />
                            <button disabled={data.content || data.media.file ? false : true}
                                type="submit"
                                className="btn btn-primary btn-sm rounded-2 shadow ms-auto" tabIndex="0">Poster</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Editor