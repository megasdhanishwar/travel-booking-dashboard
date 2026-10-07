import React from "react";
import Modal from "./Modal";
export default function ConfirmModal({
  open,
  title = "Delete this item?",
  text = "This action cannot be undone.",
  onClose,
  onConfirm,
}) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      footer={
        <>
          <button className="btn secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn danger" onClick={onConfirm}>
            Delete
          </button>
        </>
      }
    >
      <p className="modal-copy">{text}</p>
    </Modal>
  );
}
