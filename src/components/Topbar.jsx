import React from "react";
import { FiMenu, FiSearch, FiBell, FiChevronDown } from "react-icons/fi";

export default function Topbar({ setOpen, title, subtitle }) {
  return (
    <header className="topbar">
      {/* <button className="icon-btn menu-btn" onClick={() => setOpen(true)}>
        <FiMenu />
      </button> */}
      <div className="page-heading">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="top-actions">
        <div className="top-search">
          <FiSearch />
          <input placeholder="Search anything..." />
        </div>
        <button className="icon-btn notification">
          <FiBell />
          <i />
        </button>
        <div className="profile">
          <div className="avatar">ES</div>
          <div>
            <b>Eswar</b>
            <span>Administrator</span>
          </div>
          <FiChevronDown />
        </div>
      </div>
    </header>
  );
}
