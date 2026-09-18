import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Avatar, Dropdown, Typography} from "antd";
import {
  BellOutlined,
  UserOutlined,
  DownOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import api from "../../lib/api";

function Topbar({ onMenuClick }) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hour = new Date().getHours();

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const response = await api.get("/notification/getAll");
        setUnreadCount(
          (response.data.notifications || []).filter((item) => !item.isRead).length
        );
      } catch {
        setUnreadCount(0);
      }
    };

    loadNotifications();
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout =() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  const items = [
    {
      key: "1",
      label: "My Profile",
      onClick: () => navigate(`/${user?.role || "employee"}/profile`),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      danger: true,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <header className="min-h-[64px] bg-white border-b border-gray-200 shadow-sm px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-2">
      {/* Left Section */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg text-gray-600 hover:bg-gray-100 lg:hidden"
          onClick={onMenuClick}
        >
          <MenuOutlined />
        </button>
        <div className="min-w-0">
        <Typography.Title level={2} className="!mb-0 max-w-[52vw] truncate !text-base sm:!max-w-none sm:!text-2xl">
            {greeting}, {user?.name || "User"} 👋
        </Typography.Title>

        <p className="hidden text-sm text-gray-500 sm:block">
          {today}
        </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-6">

        {/* Notifications */}
        <Badge count={unreadCount} size="small">
          <BellOutlined
            className="cursor-pointer text-xl text-gray-600 transition hover:text-blue-600 sm:text-2xl"
            onClick={() => navigate(`/${user?.role || "employee"}/notifications`)}
          />
        </Badge>

        {/* Profile */}
        <Dropdown menu={{ items }} trigger={["click"]}>
          <div className="flex items-center gap-1.5 cursor-pointer rounded-xl px-1.5 py-2 transition hover:bg-gray-100 sm:gap-3 sm:px-3">
            <Avatar
              size={36}
              icon={<UserOutlined />}
            />

            <div className="hidden md:flex flex-col min-w-[140px]">
              <span className="font-semibold text-gray-800 whitespace-nowrap">
                {user?.name || "User"}
              </span>

              <span className="text-xs text-gray-500 whitespace-nowrap">
                {user?.role || "Employee"}
              </span>
            </div>

            <DownOutlined className="text-xs text-gray-500 sm:text-sm" />
          </div>
        </Dropdown>
      </div>
    </header>
  );
}

export default Topbar;