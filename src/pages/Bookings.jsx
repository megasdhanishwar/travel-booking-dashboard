import React, { useMemo, useState } from "react";
import { FiEye, FiDownload } from "react-icons/fi";
import { bookings } from "../data";
import FilterBar from "../components/FilterBar";
import StatusBadge from "../components/StatusBadge";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
export default function Bookings() {
  const [search, setSearch] = useState(""),
    [destination, setDestination] = useState(""),
    [status, setStatus] = useState(""),
    [sort, setSort] = useState("latest"),
    [page, setPage] = useState(1),
    [selected, setSelected] = useState(null);
  const filtered = useMemo(
    () =>
      bookings
        .filter(
          (b) =>
            (!search ||
              `${b.id} ${b.customer} ${b.trip}`
                .toLowerCase()
                .includes(search.toLowerCase())) &&
            (!destination || b.destination === destination) &&
            (!status || b.booking === status),
        )
        .sort((a, b) =>
          sort === "price-low"
            ? a.amount - b.amount
            : sort === "price-high"
              ? b.amount - a.amount
              : 0,
        ),
    [search, destination, status, sort],
  );
  return (
    <div className="page-content">
      <div className="page-actions">
        <div>
          <span className="eyebrow">RESERVATIONS</span>
          <h2>Bookings</h2>
          <p>Manage reservations, statuses and payment progress.</p>
        </div>
        <button className="btn secondary">
          <FiDownload /> Export
        </button>
      </div>
      <FilterBar
        {...{
          search,
          setSearch,
          destination,
          setDestination,
          status,
          setStatus,
          sort,
          setSort,
        }}
      />
      <section className="panel table-panel">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Booking</th>
                <th>Customer</th>
                <th>Trip</th>
                <th>Travel date</th>
                <th>Amount</th>
                <th>Booking status</th>
                <th>Payment</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.slice((page - 1) * 6, page * 6).map((b) => (
                <tr key={b.id}>
                  <td>
                    <b>{b.id}</b>
                  </td>
                  <td>
                    {b.customer}
                    <small>
                      {b.guests} guest{b.guests > 1 ? "s" : ""}
                    </small>
                  </td>
                  <td>
                    {b.trip}
                    <small>{b.destination}</small>
                  </td>
                  <td>{b.date}</td>
                  <td>
                    <b>${b.amount.toLocaleString()}</b>
                  </td>
                  <td>
                    <StatusBadge>{b.booking}</StatusBadge>
                  </td>
                  <td>
                    <StatusBadge tone={b.payment.toLowerCase()}>
                      {b.payment}
                    </StatusBadge>
                  </td>
                  <td>
                    <button
                      className="table-icon"
                      onClick={() => setSelected(b)}
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
        title={`Booking ${selected?.id}`}
        onClose={() => setSelected(null)}
        footer={
          <button className="btn secondary" onClick={() => setSelected(null)}>
            Close
          </button>
        }
      >
        {selected && (
          <div className="detail-grid">
            <div>
              <span>Customer</span>
              <b>{selected.customer}</b>
            </div>
            <div>
              <span>Trip</span>
              <b>{selected.trip}</b>
            </div>
            <div>
              <span>Guests</span>
              <b>{selected.guests}</b>
            </div>
            <div>
              <span>Travel date</span>
              <b>{selected.date}</b>
            </div>
            <div>
              <span>Amount</span>
              <b>${selected.amount.toLocaleString()}</b>
            </div>
            <div>
              <span>Payment status</span>
              <b>{selected.payment}</b>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
