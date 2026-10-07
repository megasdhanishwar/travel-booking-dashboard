import React from "react";
import {
  FiDollarSign,
  FiCalendar,
  FiUsers,
  FiMapPin,
  FiArrowRight,
  FiMoreHorizontal,
} from "react-icons/fi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { monthlyRevenue, bookings, trips, destinations } from "../data";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
export default function Dashboard({ setPage }) {
  return (
    <div className="page-content">
      <div className="welcome">
        <div>
          <span className="eyebrow">WEDNESDAY, OCTOBER 07, 2026</span>
          <h2>Good afternoon, Eswar 👋</h2>
          <p>Here’s what’s happening across your travel business today.</p>
        </div>
        <button className="btn primary" onClick={() => setPage("trips")}>
          + Create trip
        </button>
      </div>
      <div className="stats-grid">
        <StatCard
          label="Total revenue"
          value="$180.1K"
          change="12.8%"
          note="vs last month"
          icon={<FiDollarSign />}
        />
        <StatCard
          label="Total bookings"
          value="401"
          change="8.4%"
          note="vs last month"
          icon={<FiCalendar />}
        />
        <StatCard
          label="Customers"
          value="1,248"
          change="6.2%"
          note="vs last month"
          icon={<FiUsers />}
        />
        <StatCard
          label="Destinations"
          value="24"
          change="4 new"
          note="this quarter"
          icon={<FiMapPin />}
        />
      </div>
      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <div className="panel-head">
            <div>
              <h3>Revenue overview</h3>
              <p>Monthly revenue performance</p>
            </div>
            <select>
              <option>Last 7 months</option>
            </select>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f8cff" stopOpacity=".3" />
                    <stop offset="100%" stopColor="#4f8cff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip
                  formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4f8cff"
                  strokeWidth={3}
                  fill="url(#rev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Booking status</h3>
              <p>Current booking pipeline</p>
            </div>
            <button className="icon-btn">
              <FiMoreHorizontal />
            </button>
          </div>
          <div className="booking-bars">
            <div>
              <span>
                Confirmed <b>68%</b>
              </span>
              <i>
                <em style={{ width: "68%" }} />
              </i>
            </div>
            <div>
              <span>
                Pending <b>18%</b>
              </span>
              <i>
                <em style={{ width: "18%" }} />
              </i>
            </div>
            <div>
              <span>
                Cancelled <b>9%</b>
              </span>
              <i>
                <em style={{ width: "9%" }} />
              </i>
            </div>
            <div>
              <span>
                Refunded <b>5%</b>
              </span>
              <i>
                <em style={{ width: "5%" }} />
              </i>
            </div>
          </div>
          <div className="mini-total">
            <strong>401</strong>
            <span>Total bookings</span>
          </div>
        </section>
      </div>
      <div className="dashboard-grid lower">
        <section className="panel table-panel">
          <div className="panel-head">
            <div>
              <h3>Recent bookings</h3>
              <p>Latest customer reservations</p>
            </div>
            <button className="text-btn" onClick={() => setPage("bookings")}>
              View all <FiArrowRight />
            </button>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Booking</th>
                  <th>Customer</th>
                  <th>Trip</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((b) => (
                  <tr key={b.id}>
                    <td>
                      <b>{b.id}</b>
                      <small>{b.date}</small>
                    </td>
                    <td>{b.customer}</td>
                    <td>{b.trip}</td>
                    <td>
                      <b>${b.amount.toLocaleString()}</b>
                    </td>
                    <td>
                      <StatusBadge>{b.booking}</StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="panel popular">
          <div className="panel-head">
            <div>
              <h3>Popular destinations</h3>
              <p>By total bookings</p>
            </div>
            <button
              className="text-btn"
              onClick={() => setPage("destinations")}
            >
              See all
            </button>
          </div>
          {destinations.slice(0, 4).map((d, i) => (
            <div className="destination-row" key={d.id}>
              <img src={d.image} />
              <div>
                <b>{d.name}</b>
                <span>{d.country}</span>
              </div>
              <strong>
                {d.bookings}
                <small> bookings</small>
              </strong>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
