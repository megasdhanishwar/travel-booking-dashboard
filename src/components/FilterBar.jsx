import React from "react";
import { FiSearch, FiSliders } from "react-icons/fi";
export default function FilterBar({
  search,
  setSearch,
  destination,
  setDestination,
  status,
  setStatus,
  sort,
  setSort,
  showPrice = false,
  price,
  setPrice,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-search">
        <FiSearch />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <select
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      >
        <option value="">All destinations</option>
        <option>Santorini</option>
        <option>Kyoto</option>
        <option>Amalfi Coast</option>
        <option>Bali</option>
        <option>Swiss Alps</option>
        <option>Dubai</option>
      </select>
      {status !== undefined && (
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All status</option>
          <option>Active</option>
          <option>Upcoming</option>
          <option>Draft</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
      )}
      {showPrice && (
        <select value={price} onChange={(e) => setPrice(e.target.value)}>
          <option value="">Any price</option>
          <option value="0-1200">Under $1,200</option>
          <option value="1200-1800">$1,200–$1,800</option>
          <option value="1800-99999">$1,800+</option>
        </select>
      )}
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="latest">Latest</option>
        <option value="price-low">Price: low to high</option>
        <option value="price-high">Price: high to low</option>
        <option value="name">Name A–Z</option>
      </select>
      <button className="filter-more">
        <FiSliders /> Filters
      </button>
    </div>
  );
}
