import React from "react";
import { FiInbox } from "react-icons/fi";
export default function EmptyState({
  title = "Nothing here yet",
  text = "Try changing your filters or add a new item.",
}) {
  return (
    <div className="empty">
      <div>
        <FiInbox />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
