import "./index.css";

import React from "react";

const Sort = () => {
  return (
    <div className="sort-main-container">
      <div className="sort-content-card">
        <div className="sort-input-card">
          <label className="sort-label-text">Status</label>
          <select className="sort-select-input">
            <option>All Statuses</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>
        <div className="sort-input-card">
          <label className="sort-label-text">Priority</label>
          <select className="sort-select-input">
            <option>All Priorities</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>
      <div className="sort-input-card">
        <label className="sort-label-text">Sort by</label>
        <select className="sort-select-input">
          <option>Due Date(Asc)</option>
          <option>Due Date(Desc)</option>
          <option>Priority(High-Low)</option>
          <option>Priority(Low-High)</option>
        </select>
      </div>
    </div>
  );
};

export default Sort;
