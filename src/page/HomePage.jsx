import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../auth";
import { linename, getMachinesByLine } from "../api";
import MachinePopup from "../components/MachinePopup";

// ⭐ import các page con (đúng đường dẫn vì HomePage nằm trong /page)
import OverviewPage from "../pages/Overview";
import PlanPage from "../pages/Plan";
import ErrorStatsPage from "../pages/ErrorStats";

import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const user = auth.user || {};

  const [lines, setLines] = useState([]); // danh sách line
  const [activeLineId, setActiveLineId] = useState(null); // id line đang chọn
  const [machines, setMachines] = useState([]); // danh sách máy theo line

  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // ⭐ trạng thái active:
  // "overview" | "plan" | "error" | "line-<id>"
  const [activeMenu, setActiveMenu] = useState("overview");

  const logout = () => {
    auth.isAuthed = false;
    auth.user = null;
    navigate("/", { replace: true });
  };

  // Chuẩn hoá line
  const normalizeLines = (data) => {
    if (!Array.isArray(data)) return [];
    return data.map((row) => ({
      idline: row.idline ?? row.LineID,
      ten_line: row.ten_line ?? row.LineName,
    }));
  };

  // Chuẩn hoá máy
  const normalizeMachines = (data) => {
    if (!Array.isArray(data)) return [];
    return data.map((row) => ({
      id: row.id ?? row.MachineID,
      name: row.name ?? row.MachineName,
    }));
  };

  // ⭐ Load danh sách line khi vào trang
  useEffect(() => {
    async function loadLines() {
      try {
        const data = await linename();
        const normalized = normalizeLines(data);
        setLines(normalized);

        if (normalized.length > 0) {
          const firstId = normalized[0].idline;
          setActiveLineId(firstId);

          try {
            const mData = await getMachinesByLine(firstId);
            setMachines(normalizeMachines(mData));
          } catch (err) {
            console.error("Lỗi tải máy:", err);
          }
        }
      } catch (err) {
        console.error("Lỗi tải line:", err);
      }
    }

    loadLines();
  }, []);

  // ⭐ Chọn line → load máy
  const handleSelectLine = async (idline) => {
    setActiveLineId(idline);
    setActiveMenu(`line-${idline}`);

    try {
      const mData = await getMachinesByLine(idline);
      setMachines(normalizeMachines(mData));
    } catch (err) {
      console.error("Lỗi tải máy theo line:", err);
      setMachines([]);
    }
  };

  // ⭐ Chọn máy → mở popup
  const handleSelectMachine = (machine) => {
    setSelectedMachine(machine);
    setIsPopupOpen(true);
  };

  // ⭐ Chọn menu (Tổng Quan / Kế Hoạch / Lỗi)
  const handleSelectMenu = (type) => {
    setActiveMenu(type);
  };

  // ⭐ Trang line (list máy)
  const renderLinePage = () => {
    const line = lines.find((l) => l.idline === activeLineId);

    if (!line)
      return (
        <div className="content-box">
          <h3 className="content-title">Không có dữ liệu Line</h3>
        </div>
      );

    return (
      <div className="content-box">
        <h3 className="content-title">{line.ten_line}</h3>

        <div className="machine-list">
          {machines.map((m) => (
            <button
              key={m.id}
              className="machine-btn"
              onClick={() => handleSelectMachine(m)}
            >
              {m.id}. {m.name}
            </button>
          ))}
        </div>

        {machines.length === 0 && (
          <p className="content-desc">Chưa có máy nào cho line này.</p>
        )}
      </div>
    );
  };

  // ⭐ Quyết định hiển thị page nào
  const renderMainContent = () => {
    if (activeMenu === "overview") return <OverviewPage />;
    if (activeMenu === "plan") return <PlanPage />;
    if (activeMenu === "error") return <ErrorStatsPage />;

    return renderLinePage(); // trường hợp line-<id>
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">🌿 MyApp</div>

        <button
          className={`menu-btn ${activeMenu === "overview" ? "active" : ""}`}
          onClick={() => handleSelectMenu("overview")}
        >
          Tổng Quan
        </button>

        <nav>
          {lines.map((line) => (
            <button
              key={line.idline}
              onClick={() => handleSelectLine(line.idline)}
              className={`menu-btn ${
                activeMenu === `line-${line.idline}` ? "active" : ""
              }`}
            >
              {line.ten_line}
            </button>
          ))}
        </nav>

        <button
          className={`menu-btn ${activeMenu === "plan" ? "active" : ""}`}
          onClick={() => handleSelectMenu("plan")}
        >
          Kế Hoạch
        </button>

        <button
          className={`menu-btn ${activeMenu === "error" ? "active" : ""}`}
          onClick={() => handleSelectMenu("error")}
        >
          Thống Kê Lỗi
        </button>

        <button onClick={logout} className="logout-btn">
          🚪 Đăng xuất
        </button>
      </aside>

      {/* Main content */}
      <main className="main">
        <div className="user-strip">
          <span className="user-strip-text">{user.full_name || "Người dùng"}</span>
        </div>

        <div className="content-container">{renderMainContent()}</div>
      </main>

      {/* Popup máy */}
      <MachinePopup
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        machine={selectedMachine}
      />
    </div>
  );
}
