import React from "react";
import {
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiRefreshCw,
  FiDownload,
} from "react-icons/fi";
import { bookings } from "../data";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
export default function Payments() {
  return (
    <div className="page-content">
      <div className="page-actions">
        <div>
          <span className="eyebrow">PAYMENTS</span>
          <h2>Payments</h2>
          <p>Monitor revenue, payment status and refunds.</p>
        </div>
        <button className="btn secondary">
          <FiDownload /> Export report
        </button>
      </div>
      <div className="stats-grid">
        <StatCard
          label="Collected"
          value="$24.7K"
          change="14.2%"
          note="this month"
          icon={<FiDollarSign />}
        />
        <StatCard
          label="Paid invoices"
          value="68"
          change="9.5%"
          note="this month"
          icon={<FiCheckCircle />}
        />
        <StatCard
          label="Pending"
          value="$4.2K"
          change="3.1%"
          note="awaiting payment"
          icon={<FiClock />}
        />
        <StatCard
          label="Refunds"
          value="$1.8K"
          change="2.4%"
          note="this month"
          icon={<FiRefreshCw />}
        />
      </div>
      <section className="panel table-panel">
        <div className="panel-head">
          <div>
            <h3>Recent transactions</h3>
            <p>Latest payment activity</p>
          </div>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Booking</th>
                <th>Customer</th>
                <th>Trip</th>
                <th>Amount</th>
                <th>Payment status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>
                    <b>{b.id}</b>
                  </td>
                  <td>{b.customer}</td>
                  <td>{b.trip}</td>
                  <td>
                    <b>${b.amount.toLocaleString()}</b>
                  </td>
                  <td>
                    <StatusBadge tone={b.payment.toLowerCase()}>
                      {b.payment}
                    </StatusBadge>
                  </td>
                  <td>{b.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
