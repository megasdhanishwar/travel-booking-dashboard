import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
export default function StatCard({ label, value, change, icon, note }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <div className="stat-icon">{icon}</div>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-foot">
        <b>
          <FiArrowUpRight />
          {change}
        </b>
        <span>{note}</span>
      </div>
    </div>
  );
}
