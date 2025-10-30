import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UserDashboard from "./components/UserDashboard";
import Login from "./Login";
import Register from "./Register";
import NotFound from "./components/NotFound";
import './index.css';
import ProfilePage from "./components/ProfilePage";
import Calendar from "./components/Calender";
import Reports from "./components/Reports";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/calender" element={<Calendar />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
