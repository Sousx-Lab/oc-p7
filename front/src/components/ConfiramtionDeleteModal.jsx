import React from "react";
import { InfoSvg } from "./IconsSvg";

const ConfiramtionDeleteModal = ({publicationId, deletePublication }) => {

  return (
    <div className="modal fade" id={`delete-post-modal-${publicationId}`} tabIndex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content rounded-2">
          <div className="modal-header text-white bg-danger">
            <h6 className="modal-title" id="ModalLabel">
              Supprimer une publication 
              <i className="ps-2"><InfoSvg stroke="#ffff"/></i>
            </h6>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div className="modal-body mt-2 mb-2">
            <p>
              Voulez-vous vraiment supprimer cette publication ?
            </p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary rounded-2 shadow" data-bs-dismiss="modal">
              Annuler
            </button>
            <button type="button" className="btn btn-danger rounded-2 shadow" data-bs-dismiss="modal" onClick={deletePublication}>
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfiramtionDeleteModal;