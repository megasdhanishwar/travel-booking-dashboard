import React from "react";
import {
  FiX,
  FiGrid,
  FiMapPin,
  FiCompass,
  FiUsers,
  FiCalendar,
  FiCreditCard,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";
import { FaInfinity } from "react-icons/fa6";


const items = [
  ["Dashboard", "dashboard", FiGrid],
  ["Trips", "trips", FiCompass],
  ["Destinations", "destinations", FiMapPin],
  ["Customers", "customers", FiUsers],
  ["Bookings", "bookings", FiCalendar],
  ["Payments", "payments", FiCreditCard],
  ["Calendar", "calendar", FiBarChart2],
];

export default function Sidebar({ page, setPage, open, setOpen }) {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="brand">
        <div className="brand-mark"><FaInfinity /></div>
        <div>
          <strong>InfinityGo</strong>
          <span>Travel operations</span>
        </div>
        <button
          className="icon-btn mobile-close"
          onClick={() => setOpen(false)}
        >
          <FiX />
        </button>
      </div>
      <nav>
        {items.map(([label, id, Icon]) => (
          <button
            key={id}
            className={page === id ? "nav-item active" : "nav-item"}
            onClick={() => {
              setPage(id);
              setOpen(false);
            }}
          >
            <Icon />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="nav-item">
          <FiSettings />
          <span>Settings</span>
        </button>
        {/* <div className="upgrade">
          <span className="upgrade-icon">✦</span>
          <div>
            <b>Travel Pro</b>
            <small>Analytics are ready</small>
          </div>
        </div> */}
      </div>
    </aside>
  );
}
