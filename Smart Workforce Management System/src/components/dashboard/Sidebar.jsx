import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaChartPie,
  FaUsers,
  FaProjectDiagram,
  FaTasks,
  FaChartLine,
  FaRobot,
  FaFileAlt,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaBuilding,
  FaAngleDoubleLeft, 
  FaAngleDoubleRight, 
} from "react-icons/fa";
import logo from "../../assets/logo.png";

const adminMenu = [
  { name: "Dashboard", icon: <FaChartPie />, path: "/admin/dashboard" },
  { name: "Employees", icon: <FaUsers />, path: "/admin/employees" },
  { name: "Departments", icon: <FaBuilding />, path: "/admin/departments" },
  { name: "Projects", icon: <FaProjectDiagram />, path: "/admin/projects" },
  { name: "Tasks", icon: <FaTasks />, path: "/admin/tasks" },
  { name: "Analytics", icon: <FaChartLine />, path: "/admin/analytics" },
  { name: "AI Assistant", icon: <FaRobot />, path: "/admin/aiAssistant" },
  { name: "Reports", icon: <FaFileAlt />, path: "/admin/reports" },
  { name: "Notifications", icon: <FaBell />, path: "/admin/notifications" },
  { name: "Profile", icon: <FaUserCircle />, path: "/admin/profile" },
];

const managerMenu = [
  { name: "Dashboard", icon: <FaChartPie />, path: "/manager/dashboard" },
  { name: "Employees", icon: <FaUsers />, path: "/manager/employees" },
  { name: "Projects", icon: <FaProjectDiagram />, path: "/manager/projects" },
  { name: "Tasks", icon: <FaTasks />, path: "/manager/tasks" },
  { name: "Reports", icon: <FaFileAlt />, path: "/manager/reports" },
  { name: "Notifications", icon: <FaBell />, path: "/manager/notifications" },
  { name: "AI Assistant", icon: <FaRobot />, path: "/manager/aiAssistant" },
  { name: "Profile", icon: <FaUserCircle />, path: "/manager/profile" },
];

const employeeMenu = [
  { name: "Dashboard", icon: <FaChartPie />, path: "/employee/dashboard" },
  { name: "My Tasks", icon: <FaTasks />, path: "/employee/tasks" },
  { name: "My Projects", icon: <FaProjectDiagram />, path: "/employee/projects" },
  { name: "Notifications", icon: <FaBell />, path: "/employee/notifications" },
  { name: "Profile", icon: <FaUserCircle />, path: "/employee/profile" },
];

function Sidebar({ role = "admin", mobileOpen = false, onClose }) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = role === "admin" ? adminMenu : role === "manager" ? managerMenu : employeeMenu;

  const navigate = useNavigate();

  const handleLogout =() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 ${
          collapsed ? "lg:w-24" : "lg:w-72"
        } w-72 min-h-screen bg-[#0B1120] border-r border-slate-800 text-white flex flex-col shadow-2xl transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

      <div className="px-5 py-6 border-b border-white/10">

        <div className={`flex items-center ${collapsed ? "flex-col gap-4 justify-center" : "justify-between"}`}>
          <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
            <img src={logo} alt="Smart Workforce" className="h-full w-full object-cover" />
          </div>
          {!collapsed && (
            <div>

              <h1 className="text-2xl font-bold">
                Smart Workforce
              </h1>

              <p className="text-sm text-blue-200 mt-1">
                AI Workforce Intelligence
              </p>

            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 flex-shrink-0"
          >
            {collapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
          </button>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-6">

        {menuItems.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}
            title={collapsed ? item.name : ""}
            className={({ isActive }) =>
              `flex items-center ${
                collapsed ? "justify-center" : "gap-4"
              } px-5 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                  : "text-slate-300 hover:hover:bg-white/5 hover:translate-x-1"
              }`
            }
          onClick={onClose}
          >
            <span className="text-xl flex-shrink-0">
              {item.icon}
            </span>

            {!collapsed && (
              <span className="font-medium whitespace-nowrap">
                {item.name}
              </span>
            )}

          </NavLink>

        ))}

      </nav>

      {/* Logout */}

      <div className="p-4 border-t border-white/10">

        <button
          title={collapsed ? "Logout" : ""}
          className={`w-full flex items-center ${
            collapsed ? "justify-center" : "gap-4"
          } px-5 py-3 rounded-xl text-slate-300 hover:bg-red-500 hover:text-white transition-all duration-300`}
          onClick={handleLogout}
        >
          <span className="text-xl flex-shrink-0">
            <FaSignOutAlt />
          </span>

          {!collapsed && (
            <span className="font-medium">
              Logout
            </span>
          )}

        </button>

      </div>

    </aside>
    </>
  );
}

export default Sidebar;
