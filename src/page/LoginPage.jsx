import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { auth } from "../auth";
import bgImage from "../img/1.jpg";
export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const data = await login(username, password);
        if (data.ok) {
          localStorage.setItem("user", JSON.stringify(data.user));
          auth.isAuthed = true;        // ✅ chỉ lưu trong RAM
          auth.user = data.user;
          navigate("/home");
        } else {
          alert(data.message || "Sai tài khoản hoặc mật khẩu!");
        }
      } catch (err) {
        alert("Không thể kết nối tới server!");
      }
    };

  return (
    <div style={wrapStyle} >
      <form onSubmit={handleLogin} style={cardStyle}>
        <h3 style={{ margin: 0 }}>Đăng nhập</h3>

        <label style={labelStyle}>Tài khoản</label>
        <input
          style={inputStyle}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        
        />

        <label style={labelStyle}>Mật khẩu</label>
        <input
          style={inputStyle}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
        />

<div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 12 }}>
  <button type="submit" style={{ ...btnStyle, flex: 1 }}>
    Đăng nhập
  </button>
  <button
    type="button"
    style={{ ...btnOutline, flex: 1 }}
    onClick={() => navigate("/register")}
  >
    Đăng ký
  </button>
</div>
      </form>
    </div>
  );
}

// Style đơn giản
const wrapStyle = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  background: "#f3f4f6",
  backgroundImage: `url(${bgImage})`,
};
const cardStyle = {
  width: "100%",
  maxWidth: 360,
  background: "#fff",
  borderRadius: 12,
  padding: 20,
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  gap: 10,
};
const labelStyle = { fontSize: 14, color: "#374151", marginTop: 8 };
const inputStyle = {
  height: 40,
  borderRadius: 8,
  border: "1px solid #d1d5db",
  padding: "0 12px",
};
const btnStyle = {
 
  height: 42,
  border: "1px solid #111827",
  background: "#111827",
  color: "#fff",
  borderRadius: 10,
  fontWeight: 700,
  cursor: "pointer",
};
const btnOutline = { height:42, border:"2px solid #111827", background:"transparent", color:"#111827", borderRadius:10, fontWeight:700, cursor:"pointer" };