import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import PublicLayout from "../components/layouts/PublicLayout";
import MainLayout from "../components/layouts/MainLayout";

import Home from "../pages/Home";
import BookDemo from "../pages/BookDemo";

import Login from "../pages/forms/Login";
import CreateWorkspace from "../pages/forms/CreateWorkspace";
import ForgotPassword from "../pages/forms/ForgotPassword";
import PrivacyPolicy from "../pages/legal/PrivacyPolicy";
import TermsOfService from "../pages/legal/TermsOfService";

import Dashboard from "../pages/admin/Dashboard";
import Employees from "../pages/admin/Employees";
import Departments from "../pages/admin/Departments";
import Projects from "../pages/admin/Projects";
import Tasks from "../pages/admin/Tasks";
import Analytics from "../pages/admin/Analytics";
import AIAssistant from "../pages/admin/AIAssistant";
import Reports from "../pages/admin/Reports";
import Notifications from "../pages/admin/Notifications";
import Profile from "../pages/admin/Profile";
import EmployeeDashboard from "../pages/employee/Dashboard";
import EmployeeTasks from "../pages/employee/Tasks";
import EmployeeProjects from "../pages/employee/Projects";
import ManagerDashboard from "../pages/manager/Dashboard";
import ManagerEmployees from "../pages/manager/Employees";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Website */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/book-demo" element={<BookDemo />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Route>

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/createWorkspace" element={<CreateWorkspace />} />
        <Route path="/register" element={<CreateWorkspace />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard */}
        <Route path="/admin" element={<ProtectedRoute><MainLayout/></ProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="departments" element={<Departments />} />
          <Route path="projects" element={<Projects />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="aiAssistant" element={<AIAssistant />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          
        </Route>

        <Route path="/manager" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="employees" element={<ManagerEmployees />} />
          <Route path="projects" element={<Projects />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="aiAssistant" element={<AIAssistant />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/employee" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="tasks" element={<EmployeeTasks />} />
          <Route path="projects" element={<EmployeeProjects />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;