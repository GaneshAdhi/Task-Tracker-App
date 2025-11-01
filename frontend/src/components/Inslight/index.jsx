import React from "react";
import "./index.css";
// Assuming imports from heroicons or a similar library
import { SparklesIcon, ChartBarIcon } from "@heroicons/react/24/solid";
// Assuming imports from recharts
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

const InsightsSidebar = ({ insights, suggestions, isLoading }) => {
  return (
    <div className="insights-sidebar">
      {/* Summary Card */}
      <div className="summary-card">
        <h3 className="summary-heading">Summary</h3>
        <p className="summary-text">{insights.summary}</p>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-section">
        <h3 className="section-heading">Key Metrics</h3>
        <div className="metrics-grid">
          <div className="metric-item">
            <p className="metric-value text-red">{insights.byPriority.High}</p>
            <p className="metric-label">High Priority</p>
          </div>
          <div className="metric-item">
            <p className="metric-value text-yellow">{insights.dueSoonCount}</p>
            <p className="metric-label">Due Soon</p>
          </div>
          <div className="metric-item">
            <p className="metric-value text-green">{insights.byStatus.Done}</p>
            <p className="metric-label">Completed</p>
          </div>
          <div className="metric-item">
            <p className="metric-value metric-value-small">
              {insights.busiestDay || "N/A"}
            </p>
            <p className="metric-label">Busiest Day</p>
          </div>
        </div>
      </div>

      {/* Smart Suggestions */}
      <div className="suggestions-card">
        <h3 className="suggestions-heading">
          <SparklesIcon className="icon" /> Smart Suggestions
        </h3>
        {isLoading ? (
          <div className="loading-skeleton">
            <div className="skeleton-bar w-3-4"></div>
            <div className="skeleton-bar w-1-2"></div>
          </div>
        ) : (
          <ul className="suggestion-list">
            {suggestions
              .split("\n")
              .map(
                (line, index) =>
                  line.trim() && (
                    <li key={index}>
                      {line.replace(/^- /, "").replace(/^\* /, "")}
                    </li>
                  )
              )}
          </ul>
        )}
      </div>

      {/* Weekly Workload Chart */}
      <div className="chart-section">
        <h3 className="section-heading flex-center">
          <ChartBarIcon className="icon" /> Weekly Workload
        </h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={insights.tasksPerDay}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(128, 128, 128, 0.2)"
              />
              <XAxis
                dataKey="date"
                tick={{ fill: "currentColor", fontSize: 12 }}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: "currentColor", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(31, 41, 55, 0.8)",
                  borderColor: "rgba(75, 85, 99, 1)",
                  color: "#fff",
                  borderRadius: "0.5rem",
                }}
              />
              <Bar dataKey="count" fill="#3b82f6" name="Tasks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InsightsSidebar;
