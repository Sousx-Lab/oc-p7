import React from "react";
import { EditSvg } from "./IconsSvg";
import Editor from "./editor/Editor";

const EditModal = () => {

    const editorContext = "edit-post"

    const handleSubmit = () => {
        console.log("submit")
    }
    return (
    
        <div id="edit-post-modal" className="modal fade" tabIndex="-1" aria-hidden="true" style={{ zIndex: 1090 }}>
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
                        <Editor editorContext={editorContext} emojiTriggerContext={editorContext} handleSubmit={handleSubmit} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary rounded-2 shadow" data-bs-dismiss="modal">
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditModal;