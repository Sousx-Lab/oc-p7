import React, { useContext, useEffect, useState } from "react";
import { EditSvg } from "./IconsSvg";
import Editor from "./editor/Editor";
import { PublicationContext } from "../contexts/PublicationContext";
import { toast } from "react-toastify";
import { isValidHttpUrl } from "../services/outils/objectValidator";

const EditPublicationModal = ({ handleUpdate, editorContext = "edit-publication"}) => {
 
    const { publication } = useContext(PublicationContext);
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = async (event, formData) => {
        const form = new FormData(event.target);
        if (formData.media.fileBlob) {
            form.set('media', formData.media.fileBlob);
        }else if(isValidHttpUrl(formData.media.file)){
            form.set('media', formData.media.file.split('/').pop());
        }
        const submited = await handleUpdate(publication.id, form);
        if (submited) {
            toast.success('La publication à été mise à jour avec succès');
            document.getElementById(`close-modal-${data.id}`).click();
            setData({});
            return submited;
        } else {
            toast.error("Une erreur s'est produite lors de la mise à jour de la publication !");
        }
    }

    useEffect(() => {
        setData(publication);
    },[publication])
    return (
        <div id={`edit-publication-modal${data.id}`} className="modal fade" tabIndex="-1" aria-hidden="true" style={{ zIndex: 1090 }}>
            <div className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                <div className="modal-content rounded-2">
                    <div className="modal-header text-white bg-primary">
                        <h6 className="modal-title">Editer une publication
                            <i className="ps-2"><EditSvg stroke="#ffff" /></i>
                        </h6>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Editor editorContext={editorContext} emojiTriggerContext={editorContext} handleSubmit={handleSubmit} publication={data} />
                    </div>
                    <div className="modal-footer">
                        <button id={`close-modal-${data.id}`} type="button" className="btn btn-primary rounded-2 shadow" data-bs-dismiss="modal">
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPublicationModal;