import React, { useState } from "react";
import { FiMapPin, FiStar, FiArrowUpRight } from "react-icons/fi";
import { destinations } from "../data";
import Modal from "../components/Modal";
export default function Destinations() {
  const [selected, setSelected] = useState(null);
  return (
    <div className="page-content">
      <div className="page-actions">
        <div>
          <span className="eyebrow">DESTINATION MANAGEMENT</span>
          <h2>Destinations</h2>
          <p>Curate the places your customers love to explore.</p>
        </div>
        <button className="btn primary">+ Add destination</button>
      </div>
      <div className="destination-grid">
        {destinations.map((d) => (
          <article
            className="destination-card"
            key={d.id}
            onClick={() => setSelected(d)}
          >
            <div className="destination-image">
              <img src={d.image} />
              <span>★ {d.rating}</span>
            </div>
            <div className="destination-info">
              <div>
                <h3>{d.name}</h3>
                <p>
                  <FiMapPin />
                  {d.country}
                </p>
              </div>
              <button>
                <FiArrowUpRight />
              </button>
            </div>
            <div className="destination-meta">
              <span>
                <b>{d.trips}</b> trips
              </span>
              <span>
                <b>{d.bookings}</b> bookings
              </span>
            </div>
          </article>
        ))}
      </div>
      <Modal
        open={!!selected}
        title={selected?.name}
        onClose={() => setSelected(null)}
        footer={
          <button className="btn secondary" onClick={() => setSelected(null)}>
            Close
          </button>
        }
      >
        {selected && (
          <div className="destination-detail">
            <img src={selected.image} />
            <h3>
              {selected.name}, {selected.country}
            </h3>
            <p>
              Highly rated destination with {selected.trips} active trip
              experiences and {selected.bookings} bookings.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
