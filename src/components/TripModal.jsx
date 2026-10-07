import React, { useEffect, useState } from "react";
import Modal from "./Modal";
export default function TripModal({ open, onClose, onSave, trip }) {
  const [form, setForm] = useState({
    title: "",
    destination: "Santorini",
    start: "",
    end: "",
    price: "",
    capacity: "",
    status: "Upcoming",
  });
  useEffect(
    () =>
      setForm(
        trip
          ? trip
          : {
              title: "",
              destination: "Santorini",
              start: "",
              end: "",
              price: "",
              capacity: "",
              status: "Upcoming",
            },
      ),
    [trip, open],
  );
  const [error, setError] = useState("");
  const submit = () => {
    if (
      !form.title ||
      !form.start ||
      !form.end ||
      !form.price ||
      !form.capacity
    ) {
      setError("Please complete all required fields.");
      return;
    }
    setError("");
    onSave({
      ...form,
      id: trip?.id || Date.now(),
      duration: "Custom",
      booked: trip?.booked || 0,
      price: Number(form.price),
      capacity: Number(form.capacity),
    });
  };
  return (
    <Modal
      open={open}
      title={trip ? "Edit trip" : "Create new trip"}
      onClose={onClose}
      footer={
        <>
          <button className="btn secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn primary" onClick={submit}>
            {trip ? "Save changes" : "Create trip"}
          </button>
        </>
      }
    >
      <div className="form-grid">
        <label>
          Trip name *
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Bali Island Reset"
          />
        </label>
        <label>
          Destination *
          <select
            value={form.destination}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
          >
            <option>Santorini</option>
            <option>Kyoto</option>
            <option>Amalfi Coast</option>
            <option>Bali</option>
            <option>Swiss Alps</option>
            <option>Dubai</option>
          </select>
        </label>
        <label>
          Start date *
          <input
            type="date"
            value={form.start}
            onChange={(e) => setForm({ ...form, start: e.target.value })}
          />
        </label>
        <label>
          End date *
          <input
            type="date"
            value={form.end}
            onChange={(e) => setForm({ ...form, end: e.target.value })}
          />
        </label>
        <label>
          Price (USD) *
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </label>
        <label>
          Capacity *
          <input
            type="number"
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
          />
        </label>
        <label>
          Status
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Active</option>
            <option>Upcoming</option>
            <option>Draft</option>
          </select>
        </label>
      </div>
      {error && <div className="form-error">{error}</div>}
    </Modal>
  );
}
