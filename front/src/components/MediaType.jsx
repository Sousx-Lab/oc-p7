import React from "react";
import ImageViewer from "./ImageViewer";

/**
* @param {string} mediaType 
* @param {string} media
*/
const MediaType = ({ mediaType, media, id = "img"}) => {

    mediaType = mediaType.split('/').shift()
    let imgAlt = media.split('/').pop()
    if(mediaType === 'image'){
        return(
        <ImageViewer imageId={id}>
            <img id={`img-${id}`} loading="lazy" decoding="async" className="image-responsive w-100" height="auto" width="100%" src={media} alt={imgAlt}/>
        </ImageViewer>
        )
    }else if(mediaType === "video"){
        return (
            <video className="w-100" controls >
                <source src={media} type={""}></source>
            </video>
        )
    }
    return [];
}

export default MediaType;