import { useEffect } from "react";
import Viewer from 'viewerjs';

const ImageViewer = ({ children, imageId }) => {

    const viewer = (id) => {
        return new Viewer(document.getElementById(`img-${id}`), {
            inline: false,
            backdrop: true,
            button: true,
            navbar: false,
            fullscreen: true,
            title: false,
            toolbar: false,
            movable: false,
            toggleOnDblclick: true,
        });
    }
    useEffect(() => {
        viewer(imageId)
    }, [imageId]);

    return (
        <div className="cursor-zi">{children}</div>
    );
}

export default ImageViewer;