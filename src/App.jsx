import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Toast from "./components/Toast";
import Dashboard from "./pages/Dashboard";
import Trips from "./pages/Trips";
import Destinations from "./pages/Destinations";
import Customers from "./pages/Customers";
import Bookings from "./pages/Bookings";
import Payments from "./pages/Payments";
import Calendar from "./pages/Calendar";
const meta = {
  dashboard: ["Dashboard", "Your travel business at a glance"],
  trips: ["Trips", "Manage your travel experiences"],
  destinations: ["Destinations", "Curate destinations and experiences"],
  customers: ["Customers", "Manage your traveler relationships"],
  bookings: ["Bookings", "Track reservations and booking status"],
  payments: ["Payments", "Monitor payments and revenue"],
  calendar: ["Calendar", "Plan departures and travel schedules"],
};
export default function App() {
  const [page, setPage] = useState("dashboard"),
    [open, setOpen] = useState(false),
    [toast, setToast] = useState("");
  const notify = (m) => {
    setToast(m);
    setTimeout(() => setToast(""), 2800);
  };
  const Page =
    page === "dashboard"
      ? Dashboard
      : page === "trips"
        ? Trips
        : page === "destinations"
          ? Destinations
          : page === "customers"
            ? Customers
            : page === "bookings"
              ? Bookings
              : page === "payments"
                ? Payments
                : Calendar;
  return (
    <div className="app">
      <Sidebar {...{ page, setPage, open, setOpen }} />
      <div className="main">
        <Topbar
          setOpen={setOpen}
          title={meta[page][0]}
          subtitle={meta[page][1]}
        />
        <main>
          <Page setPage={setPage} toast={notify} />
        </main>
      </div>
      {open && <div className="overlay" onClick={() => setOpen(false)} />}
      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}
