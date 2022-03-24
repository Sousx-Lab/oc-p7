import React from "react";

/**
* @param {string} mediaType 
* @param {string} media
*/
const PostMedia = ({ mediaType, media}) => {

    mediaType = mediaType.split('/').shift()
    let imgAlt = media.split('/').pop()
    if(mediaType === 'image'){
        return(
            <img loading="lazy" decoding="async" className="image-responsive w-100" height="auto" width="100%" src={media} alt={imgAlt}/> 
        )
    }else if(mediaType === "video"){
        return (
            <video className="w-100" controls >
                <source src={media} type={""}></source>
            </video>
        )
    }
    return {}
}

export default PostMedia;