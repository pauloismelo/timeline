import React from "react";

export default function Modal({ item, onClose }) {
  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">{item.name}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>Start:</strong> {item.start}</p>
            <p><strong>End:</strong> {item.end}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-dark" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}