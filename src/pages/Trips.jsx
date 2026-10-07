import React, { useMemo, useState } from "react";
import { FiPlus, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { trips as initial } from "../data";
import FilterBar from "../components/FilterBar";
import StatusBadge from "../components/StatusBadge";
import Pagination from "../components/Pagination";
import TripModal from "../components/TripModal";
import ConfirmModal from "../components/ConfirmModal";
import Modal from "../components/Modal";
export default function Trips({ toast }) {
  const [items, setItems] = useState(initial),
    [search, setSearch] = useState(""),
    [destination, setDestination] = useState(""),
    [status, setStatus] = useState(""),
    [sort, setSort] = useState("latest"),
    [page, setPage] = useState(1),
    [modal, setModal] = useState(false),
    [edit, setEdit] = useState(null),
    [remove, setRemove] = useState(null),
    [view, setView] = useState(null);
  const filtered = useMemo(
    () =>
      items
        .filter(
          (t) =>
            (!search ||
              `${t.title} ${t.destination}`
                .toLowerCase()
                .includes(search.toLowerCase())) &&
            (!destination || t.destination === destination) &&
            (!status || t.status === status),
        )
        .sort((a, b) =>
          sort === "price-low"
            ? a.price - b.price
            : sort === "price-high"
              ? b.price - a.price
              : sort === "name"
                ? a.title.localeCompare(b.title)
                : b.id - a.id,
        ),
    [items, search, destination, status, sort],
  );
  const shown = filtered.slice((page - 1) * 6, page * 6);
  const save = (t) => {
    setItems(
      items.some((x) => x.id === t.id)
        ? items.map((x) => (x.id === t.id ? t : x))
        : [t, ...items],
    );
    setModal(false);
    setEdit(null);
    toast(edit ? "Trip updated successfully" : "Trip created successfully");
  };
  return (
    <div className="page-content">
      <div className="page-actions">
        <div>
          <span className="eyebrow">TRIP MANAGEMENT</span>
          <h2>Trips</h2>
          <p>Plan, publish and manage every journey.</p>
        </div>
        <button className="btn primary" onClick={() => setModal(true)}>
          <FiPlus /> Create trip
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
        showPrice={true}
      />
      <section className="panel table-panel">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Trip</th>
                <th>Destination</th>
                <th>Dates</th>
                <th>Price</th>
                <th>Seats</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((t) => (
                <tr key={t.id}>
                  <td>
                    <div className="trip-cell">
                      <div className="trip-avatar">{t.destination[0]}</div>
                      <div>
                        <b>{t.title}</b>
                        <small>{t.duration}</small>
                      </div>
                    </div>
                  </td>
                  <td>{t.destination}</td>
                  <td>
                    {t.start}
                    <small>to {t.end}</small>
                  </td>
                  <td>
                    <b>${t.price.toLocaleString()}</b>
                  </td>
                  <td>
                    <div className="seat">
                      <span>
                        {t.booked}/{t.capacity}
                      </span>
                      <i>
                        <em
                          style={{ width: `${(t.booked / t.capacity) * 100}%` }}
                        />
                      </i>
                    </div>
                  </td>
                  <td>
                    <StatusBadge>{t.status}</StatusBadge>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button onClick={() => setView(t)} title="View">
                        <FiEye />
                      </button>
                      <button
                        onClick={() => {
                          setEdit(t);
                          setModal(true);
                        }}
                      >
                        <FiEdit2 />
                      </button>
                      <button onClick={() => setRemove(t)}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!shown.length && (
            <div className="empty-wrap">No trips match your filters.</div>
          )}
        </div>
        <Pagination page={page} setPage={setPage} total={filtered.length} />
      </section>
      <TripModal
        open={modal}
        onClose={() => {
          setModal(false);
          setEdit(null);
        }}
        onSave={save}
        trip={edit}
      />
      <ConfirmModal
        open={!!remove}
        onClose={() => setRemove(null)}
        onConfirm={() => {
          setItems(items.filter((x) => x.id !== remove.id));
          setRemove(null);
          toast("Trip deleted");
        }}
      />
      <Modal
        open={!!view}
        title={view?.title}
        onClose={() => setView(null)}
        footer={
          <button className="btn secondary" onClick={() => setView(null)}>
            Close
          </button>
        }
      >
        {view && (
          <div className="detail-grid">
            <div>
              <span>Destination</span>
              <b>{view.destination}</b>
            </div>
            <div>
              <span>Dates</span>
              <b>
                {view.start} → {view.end}
              </b>
            </div>
            <div>
              <span>Price</span>
              <b>${view.price}</b>
            </div>
            <div>
              <span>Capacity</span>
              <b>
                {view.booked}/{view.capacity} booked
              </b>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
