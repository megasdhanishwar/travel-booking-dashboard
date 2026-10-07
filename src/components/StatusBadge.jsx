import React from "react";
export default function StatusBadge({ children, tone }) {
  return (
    <span
      className={`status ${tone || String(children).toLowerCase().replace(/\s/g, "-")}`}
    >
      <i />
      {children}
    </span>
  );
}
