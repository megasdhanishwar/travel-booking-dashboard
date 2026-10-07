import React, { useMemo, useState } from "react";
import { FiMail, FiPhone, FiEye, FiSearch } from "react-icons/fi";
import { customers } from "../data";
import StatusBadge from "../components/StatusBadge";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
export default function Customers() {
  const [search, setSearch] = useState(""),
    [page, setPage] = useState(1),
    [selected, setSelected] = useState(null);
  const filtered = useMemo(
    () =>
      customers.filter((c) =>
        `${c.name} ${c.email}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );
  return (
    <div className="page-content">
      <div className="page-actions">
        <div>
          <span className="eyebrow">CUSTOMER MANAGEMENT</span>
          <h2>Customers</h2>
          <p>Keep track of your travelers and their booking history.</p>
        </div>
        <button className="btn primary">+ Add customer</button>
      </div>
      <div className="filter-bar">
        <div className="filter-search">
          <FiSearch />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
          />
        </div>
      </div>
      <section className="panel table-panel">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Bookings</th>
                <th>Total spent</th>
                <th>Joined</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.slice((page - 1) * 6, page * 6).map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="customer-cell">
                      <div className="avatar">
                        {c.name
                          .split(" ")
                          .map((x) => x[0])
                          .join("")}
                      </div>
                      <div>
                        <b>{c.name}</b>
                        <small>{c.email}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <small>
                      <FiMail /> {c.email}
                    </small>
                    <small>
                      <FiPhone /> {c.phone}
                    </small>
                  </td>
                  <td>
                    <b>{c.bookings}</b>
                  </td>
                  <td>
                    <b>${c.spent.toLocaleString()}</b>
                  </td>
                  <td>{c.joined}</td>
                  <td>
                    <StatusBadge>{c.status}</StatusBadge>
                  </td>
                  <td>
                    <button
                      className="table-icon"
                      onClick={() => setSelected(c)}
                    >
                      <FiEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} setPage={setPage} total={filtered.length} />
      </section>
      <Modal
        open={!!selected}
        title="Customer profile"
        onClose={() => setSelected(null)}
        footer={
          <button className="btn secondary" onClick={() => setSelected(null)}>
            Close
          </button>
        }
      >
        {selected && (
          <div className="profile-detail">
            <div className="big-avatar">
              {selected.name
                .split(" ")
                .map((x) => x[0])
                .join("")}
            </div>
            <h3>{selected.name}</h3>
            <p>
              {selected.email} · {selected.phone}
            </p>
            <div className="detail-grid">
              <div>
                <span>Bookings</span>
                <b>{selected.bookings}</b>
              </div>
              <div>
                <span>Total spent</span>
                <b>${selected.spent}</b>
              </div>
              <div>
                <span>Member since</span>
                <b>{selected.joined}</b>
              </div>
              <div>
                <span>Customer status</span>
                <b>{selected.status}</b>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
