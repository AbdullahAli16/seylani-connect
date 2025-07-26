import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { Navigate } from "react-router-dom"; // add this at top


// Admin pages
import AdminLogin from "./adminPages/Login.jsx";
import Dashboard from "./adminPages/Dashboard.jsx";
import Appointments from "./adminPages/Appointments.jsx";
import HelpRequests from "./adminPages/HelpRequests.jsx";
import Users from "./adminPages/Users.jsx";

// User pages
import Signup from "./userPages/Signup.jsx";
import Login from "./userPages/Login.jsx"; 
import Home from "./userPages/Home.jsx";
import BookAppointment from "./userPages/BookAppointment.jsx";
import RequestHelp from "./userPages/RequestHelp.jsx";
import MyRequests from "./userPages/MyRequests.jsx";
import Profile from "./userPages/Profile.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/user/login" />} />
        {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
          <Route path="/admin/help-requests" element={<ProtectedRoute><HelpRequests /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />

          {/* User Routes */}
          <Route path="/user/signup" element={<Signup />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/user/book" element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
          <Route path="/user/help" element={<ProtectedRoute><RequestHelp /></ProtectedRoute>} />
          <Route path="/user/requests" element={<ProtectedRoute><MyRequests /></ProtectedRoute>} />
          <Route path="/user/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
