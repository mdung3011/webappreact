const API_BASE = "http://10.73.132.85:5000"; // hoặc http://10.73.132.85:5000 nếu gọi qua mạng LAN

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  return data;
}
export async function register(username, password, full_name) {
    const res = await fetch(`${API_BASE}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, full_name }),
    });
  
    const data = await res.json();
    return data;
  }
  
  // --- (tuỳ chọn) Lấy thông tin user ---
 
export async function linename() {
  const res = await fetch(`${API_BASE}/api/lines`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();
  console.log("linename() trả về:", data); // <-- Ở ĐÂY KHÔNG ĐƯỢC undefined
  return data; // data là MẢNG
}
export async function getMachinesByLine(idline) {
  const res = await fetch(`${API_BASE}/api/lines/${idline}/machines`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();   // trả về mảng máy
}