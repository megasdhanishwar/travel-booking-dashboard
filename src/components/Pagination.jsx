import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
export default function Pagination({ page, setPage, total }) {
  const pages = Math.max(1, Math.ceil(total / 6));
  return (
    <div className="pagination">
      <span>
        Showing <b>{Math.min(6, total)}</b> of <b>{total}</b> results
      </span>
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          <FiChevronLeft />
        </button>
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button disabled={page === pages} onClick={() => setPage(page + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
