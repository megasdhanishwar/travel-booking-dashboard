import React, { useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiCalendar } from "react-icons/fi";
import { trips } from "../data";
export default function Calendar() {
  const [date, setDate] = useState(new Date(2026, 9, 1));
  const year = date.getFullYear(),
    month = date.getMonth(),
    days = new Date(year, month + 1, 0).getDate(),
    start = new Date(year, month, 1).getDay();
  const cells = useMemo(
    () =>
      Array.from({ length: start + days }, (_, i) =>
        i < start ? null : i - start + 1,
      ),
    [start, days],
  );
  return (
    <div className="page-content">
      <div className="page-actions">
        <div>
          <span className="eyebrow">SCHEDULE</span>
          <h2>Travel calendar</h2>
          <p>See trips and departure dates at a glance.</p>
        </div>
        <button className="btn primary">
          <FiCalendar /> Today
        </button>
      </div>
      <section className="panel calendar-panel">
        <div className="calendar-head">
          <button
            className="icon-btn"
            onClick={() => setDate(new Date(year, month - 1, 1))}
          >
            <FiChevronLeft />
          </button>
          <h3>
            {date.toLocaleString("en-US", { month: "long", year: "numeric" })}
          </h3>
          <button
            className="icon-btn"
            onClick={() => setDate(new Date(year, month + 1, 1))}
          >
            <FiChevronRight />
          </button>
        </div>
        <div className="calendar-grid weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((x) => (
            <b key={x}>{x}</b>
          ))}
        </div>
        <div className="calendar-grid">
          {cells.map((day, i) => {
            const dayTrips = day
              ? trips.filter(
                  (t) =>
                    Number(t.start.slice(8)) === day &&
                    Number(t.start.slice(5, 7)) === month + 1 &&
                    Number(t.start.slice(0, 4)) === year,
                )
              : [];
            return (
              <div className={`calendar-day ${!day ? "muted" : ""}`} key={i}>
                <span>{day}</span>
                {dayTrips.map((t) => (
                  <div className="event" key={t.id}>
                    <b>{t.title}</b>
                    <small>{t.destination}</small>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
