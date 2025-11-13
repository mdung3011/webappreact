import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api";
import bgImage from "../img/1.jpg";

export default function RegisterPage() {
  const [username, setU] = useState("");
  const [fullName, setF] = useState("");
  const [password, setP] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
    const data = await register(username.trim(), password.trim(), fullName.trim());
      console.log(data)
      if (data?.ok) {
        alert("Đăng ký thành công! Mời bạn đăng nhập.");
        navigate("/");
      } else {
        alert(data?.message || "Đăng ký thất bại!");
      }
    } catch (err) {
      alert(err.message || "Không kết nối được server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={wrapStyle}>
      <div style={overlayStyle} />
      <form onSubmit={handleRegister} style={cardStyle}>
        <h3 style={{ margin: 0 }}>Đăng ký</h3>

        <label style={labelStyle}>Tài khoản</label>
        <input style={inputStyle} value={username} onChange={(e)=>setU(e.target.value)} placeholder="Tên đăng nhập" />

        <label style={labelStyle}>Họ và tên</label>
        <input style={inputStyle} value={fullName} onChange={(e)=>setF(e.target.value)} placeholder="Nguyễn Văn A" />

        <label style={labelStyle}>Mật khẩu</label>
        <input style={inputStyle} type="password" value={password} onChange={(e)=>setP(e.target.value)} placeholder="••••••" />

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button type="submit" style={{ ...btnStyle, flex: 1 }} disabled={loading}>
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
          <button type="button" style={{ ...btnOutline, flex: 1 }} onClick={()=>navigate("/")}>
            Quay lại
          </button>
        </div>
      </form>
    </div>
  );
}

// styles giống LoginPage
const wrapStyle = { minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center", backgroundImage:`url(${bgImage})`, backgroundSize:"cover", backgroundPosition:"center", backgroundRepeat:"no-repeat", position:"relative" };
const overlayStyle = { position:"absolute", inset:0, backgroundColor:"rgba(0,0,0,0.4)", zIndex:0 };
const cardStyle = { width:"100%", maxWidth:360, background:"rgba(255,255,255,0.9)", borderRadius:16, padding:24, boxShadow:"0 8px 30px rgba(0,0,0,0.3)", display:"flex", flexDirection:"column", gap:10, position:"relative", zIndex:1, backdropFilter:"blur(6px)" };
const labelStyle = { fontSize:14, color:"#111827", marginTop:8 };
const inputStyle = { height:40, borderRadius:8, border:"1px solid #d1d5db", padding:"0 12px", outline:"none" };
const btnStyle = { height:42, border:"none", background:"#111827", color:"#fff", borderRadius:10, fontWeight:700, cursor:"pointer" };
const btnOutline = { height:42, border:"2px solid #111827", background:"transparent", color:"#111827", borderRadius:10, fontWeight:700, cursor:"pointer" };