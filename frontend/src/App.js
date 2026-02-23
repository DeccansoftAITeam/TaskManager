import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import CreateTaskPage from "./pages/CreateTaskPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="/task/create" element={<CreateTaskPage />} />
          <Route path="/task/:id" element={<TaskDetailPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
