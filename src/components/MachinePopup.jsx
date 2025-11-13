import { useState } from "react";
import "./MachinePopup.css";
import MachineDayPage from "./MachineDayPage";
export default function MachinePopup({ open, onClose, machine }) {
  // Tabs
  const [activeTab, setActiveTab] = useState("day");

  // Bộ lọc
  const [dayFilter, setDayFilter] = useState(
    new Date().toISOString().slice(0, 10) // yyyy-MM-dd
  );
  const [monthFilter, setMonthFilter] = useState((new Date().getUTCMonth() + 1).toString());
  const [yearFilter, setYearFilter] = useState(
    new Date().getFullYear().toString()
  );
  const [selectedMetric, setSelectedMetric] = useState("All");

  if (!open || !machine) return null;

  const handleSearch = () => {
    console.log("Apply filter:", {
      tab: activeTab,
      day: dayFilter,
      month: monthFilter,
      year: yearFilter,
      metric: selectedMetric,
      machineId: machine.id,
    });
    // Sau này bạn gọi API theo tab + filter ở đây
  };

  const handleExportExcel = () => {
    let periodType = "";
    let periodValue = "";

    if (activeTab === "day") {
      periodType = "Day";
      periodValue = dayFilter || "N/A";
    } else if (activeTab === "month") {
      periodType = "Month";
      periodValue = monthFilter || "N/A";
    } else {
      periodType = "Year";
      periodValue = yearFilter || "N/A";
    }

    const rows = [
      ["PeriodType", "Period", "MachineID", "MachineName", "Metric"],
      [
        periodType,
        periodValue,
        machine.id,
        machine.name,
        activeTab === "day" ? "All" : selectedMetric,
      ],
    ];

    const csvContent = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `report_${machine.id}_${periodType.toLowerCase()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="popup-backdrop" onClick={onClose}>
      <div className="popup-body" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="popup-header">
          <h3 className="popup-title">{machine.name}</h3>
          <button className="popup-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="popup-content">
          {/* Tabs */}
          <div className="popup-tabs">
            <button
              className={`popup-tab-btn ${
                activeTab === "day" ? "active" : ""
              }`}
              onClick={() => setActiveTab("day")}
            >
              Ngày
            </button>
            <button
              className={`popup-tab-btn ${
                activeTab === "month" ? "active" : ""
              }`}
              onClick={() => setActiveTab("month")}
            >
              Tháng
            </button>
            <button
              className={`popup-tab-btn ${
                activeTab === "year" ? "active" : ""
              }`}
              onClick={() => setActiveTab("year")}
            >
              Năm
            </button>
          </div>

          {/* 🔹 Toolbar cho DAY */}
          {activeTab === "day" && (
            <div className="toolbar-row">
              <div className="toolbar-group">
                <span className="toolbar-label">DAY:</span>
                <input
                  type="date"
                  className="toolbar-select"
                  value={dayFilter}
                  onChange={(e) => setDayFilter(e.target.value)}
                />
              </div>

              <div className="toolbar-actions">
                <button className="toolbar-btn apply" onClick={handleSearch}>
                  Apply
                </button>
                <button
                  className="toolbar-btn export"
                  onClick={handleExportExcel}
                >
                  Export Excel
                </button>
              </div>
            </div>
          )}

          {/* 🔹 Toolbar cho MONTH / YEAR */}
          {(activeTab === "month" || activeTab === "year") && (
            <div className="toolbar-row">
              {/* MONTH */}
              <div className="toolbar-group">
                <span className="toolbar-label">MONTH:</span>
                <select
                  className="toolbar-select"
                  value={monthFilter}
                  onChange={(e) => setMonthFilter(e.target.value)}
                >
                  {/* <option value="">--</option> */}
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* YEAR */}
              <div className="toolbar-group">
                <span className="toolbar-label">YEAR:</span>
                <select
                  className="toolbar-select"
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                >
                  {Array.from({ length: 8 }).map((_, idx) => {
                    const y = 2022 + idx;
                    return (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* DATA */}
              <div className="toolbar-group">
                <span className="toolbar-label">DATA:</span>
                <select
                  className="toolbar-select"
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="OEE Ratio">OEE Ratio</option>
                  <option value="OK Product Ratio">OK Product ratio</option>
                  <option value="Output Ratio">Output Ratio</option>
                  <option value="Activity Ratio">Activity Ratio</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="toolbar-actions">
                <button className="toolbar-btn apply" onClick={handleSearch}>
                  Apply
                </button>
                <button
                  className="toolbar-btn export"
                  onClick={handleExportExcel}
                >
                  Export Excel
                </button>
              </div>
            </div>
          )}

          {/* Nội dung theo tab */}
          <div className="popup-content-box">
          {activeTab === "day" && (
            <MachineDayPage machine={machine} day={dayFilter} />
          )}

            {activeTab === "month" && (
              <div>
                <h4>Dữ liệu theo tháng</h4>
                <p>
                  Hiển thị dữ liệu <b>tháng</b> của máy <b>{machine.name}</b> dựa
                  trên MONTH/YEAR/DATA phía trên.
                </p>
              </div>
            )}

            {activeTab === "year" && (
              <div>
                <h4>Dữ liệu theo năm</h4>
                <p>
                  Dữ liệu <b>năm</b> của máy <b>{machine.name}</b> sẽ hiển thị dựa
                  trên YEAR/DATA phía trên.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        {/* <div className="popup-footer">
          <button className="popup-btn" onClick={onClose}>
            Đóng
          </button>
        </div> */}
      </div>
    </div>
  );
}