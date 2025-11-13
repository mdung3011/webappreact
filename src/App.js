import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import HomePage from "./page/HomePage";
import RegisterPage from "./page/RegisterPage";
import { auth } from "./auth";

function RequireAuth({ children }) {
  return auth.isAuthed ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route path="/register" element={<RegisterPage />} /> {/* ✅ đặt vào đây */}
      </Routes>
    </BrowserRouter>
  );
}