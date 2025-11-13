import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
  export default function MachineDayPage({ machine, day }) {
    if (!machine || !day) return null;
  
    // ----- DỮ LIỆU DEMO PIE (sau này bạn thay bằng API) -----
    const pieData = [
      { name: "Operation", value: 7.58 * 60 }, // phút
      { name: "Others", value: 2.42 * 60 },
    ];
  
    const COLORS = ["#00a03e", "#000000"];
  
    // Dữ liệu bảng chi tiết
    const detailRows = [
      { color: "#00a03e", label: "Operation", time: "7h 35m 4s", ratio: "23.61%" },
      { color: "#f97316", label: "Small Stop", time: "0h 0m 14s", ratio: "0%" },
      { color: "#ef4444", label: "Fault", time: "0h 0m 0s", ratio: "0%" },
      { color: "#eab308", label: "Break", time: "0h 0m 0s", ratio: "0%" },
      { color: "#6b21a8", label: "Maintenance", time: "0h 0m 0s", ratio: "0%" },
      { color: "#22c55e", label: "Eat", time: "0h 0m 0s", ratio: "0%" },
      { color: "#0ea5e9", label: "Waiting", time: "0h 0m 0s", ratio: "0%" },
      { color: "#38bdf8", label: "Check Machinery", time: "0h 0m 0s", ratio: "0%" },
      { color: "#a855f7", label: "Change Product Code", time: "0h 0m 0s", ratio: "0%" },
      { color: "#fb7185", label: "Glue Cleaning Paper", time: "0h 0m 0s", ratio: "0%" },
      { color: "#1d4ed8", label: "Machinery Edit", time: "0h 0m 0s", ratio: "0%" },
      { color: "#6b7280", label: "Others", time: "0h 6m 25s", ratio: "76.39%" },
    ];
  
    // PRODUCT demo
    const productInfo = {
      total: 336,
      ok: 336,
      ng: 0,
      ratio: "100%",
    };
  
    return (
      <div>
        {/* <h4>Dữ liệu theo ngày</h4>
        <p>
          Máy: <b>{machine.name}</b> (ID: {machine.id}) &nbsp;|&nbsp; Ngày:{" "}
          <b>{day}</b>
        </p> */}
  
        {/* GRID 2 CỘT: PIE (TRÁI) + BẢNG (PHẢI) */}
        <div
          style={{
            marginTop: 8,
            display: "grid",
            gridTemplateColumns: "1fr 1fr", // 🔥 mỗi bên 50%
            gap: 12,
            width: "100%",
          }}
        >
          {/* PIE CHART */}
          <div
            style={{
              borderRadius: 8,
              border: "1px solid #d1d5db",
              background: "#ffffff",
              padding: 8,
            }}
          >
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="90%"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
  
          {/* BẢNG LEGEND + THỜI GIAN + % */}
          <div
            style={{
              borderRadius: 8,
              border: "1px solid #d1d5db",
              background: "#ffffff",
              padding: 8,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 12,
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      borderBottom: "1px solid #d1d5db",
                      textAlign: "left",
                      padding: "4px 6px",
                      width: 60,
                    }}
                  >
                    Pie Chart
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #d1d5db",
                      textAlign: "left",
                      padding: "4px 6px",
                    }}
                  >
                    Loại dữ liệu
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #d1d5db",
                      textAlign: "left",
                      padding: "4px 6px",
                    }}
                  >
                    Tổng thời gian
                  </th>
                  <th
                    style={{
                      borderBottom: "1px solid #d1d5db",
                      textAlign: "right",
                      padding: "4px 6px",
                      width: 70,
                    }}
                  >
                    Tỷ lệ (%)
                  </th>
                </tr>
              </thead>
              <tbody>
                {detailRows.map((row, idx) => (
                  <tr key={idx}>
                    <td
                      style={{
                        padding: "3px 6px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: 14,
                          height: 14,
                          borderRadius: 3,
                          backgroundColor: row.color,
                        }}
                      />
                    </td>
                    <td
                      style={{
                        padding: "3px 6px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {row.label}
                    </td>
                    <td
                      style={{
                        padding: "3px 6px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {row.time}
                    </td>
                    <td
                      style={{
                        padding: "3px 6px",
                        borderBottom: "1px solid #e5e7eb",
                        textAlign: "right",
                      }}
                    >
                      {row.ratio}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
  
            <div style={{ marginTop: 6, fontSize: 12 }}>
              <b>Power Run:</b> 7h 55m 48s
            </div>
          </div>
        </div>
  
        {/* BẢNG PRODUCT NHỎ, LỆCH PHẢI */}
        <div
          style={{
            marginTop: 10,
            borderRadius: 8,
            border: "1px solid #d1d5db",
            background: "#ffffff",
            padding: 8,
            width: "40%",       // 🔥 nhỏ lại
            marginLeft: "auto", // 🔥 đẩy sang phải
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 14,
            }}
          >
            <thead>
              <tr>
                <th
                  colSpan={4}
                  style={{
                    borderBottom: "1px solid #d1d5db",
                    padding: "4px 6px",
                    textAlign: "left",
                  }}
                >
                  PRODUCT
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "4px 6px" }}>TOTAL</td>
                <td style={{ padding: "4px 6px" }}>{productInfo.total}</td>
                <td style={{ padding: "4px 6px" }}>OK</td>
                <td
                  style={{
                    padding: "4px 6px",
                    color: "#16a34a",
                    fontWeight: 700,
                  }}
                >
                  {productInfo.ok}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "4px 6px" }}>NG</td>
                <td
                  style={{
                    padding: "4px 6px",
                    color: "#ef4444",
                    fontWeight: 700,
                  }}
                >
                  {productInfo.ng}
                </td>
                <td style={{ padding: "4px 6px" }}>RATIO</td>
                <td style={{ padding: "4px 6px", fontWeight: 700 }}>
                  {productInfo.ratio}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }