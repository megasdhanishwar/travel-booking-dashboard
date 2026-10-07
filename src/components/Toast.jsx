import React from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";
export default function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="toast">
      <FiCheckCircle />
      <span>{message}</span>
      <button onClick={onClose}>
        <FiX />
      </button>
    </div>
  );
}
