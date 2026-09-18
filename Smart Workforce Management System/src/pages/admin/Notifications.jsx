import { useEffect, useState } from "react";
import { message } from "antd";
import dayjs from "dayjs";
import api from "../../lib/api";

import NotificationsHeader from "../../components/dashboard/notifications/NotificationsHeader";
import NotificationsCards from "../../components/dashboard/notifications/NotificationsCards";
import NotificationsFilters from "../../components/dashboard/notifications/NotificationsFilters";
import NotificationsList from "../../components/dashboard/notifications/NotificationsList";
import NotificationDrawer from "../../components/dashboard/notifications/NotificationDrawer";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    priority: "all",
    date: null,
  });

  const handleViewNotification = (notification) => {
    setSelectedNotification(notification);
    setDrawerOpen(true);
  };

  const handleMarkRead = async (notification) => {
    if (!notification || notification.isRead) return;

    try {
      await api.put(`/notification/${notification._id}/read`);
      setNotifications((items) =>
        items.map((item) =>
          item._id === notification._id ? { ...item, isRead: true } : item
        )
      );
      setSelectedNotification({ ...notification, isRead: true });
    } catch (error) {
      message.error(error.response?.data?.message || "Unable to update notification");
    }
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedNotification(null);
  };

  const handlePasswordResetDecision = async (notification, approved) => {
    const email = notification?.email || notification?.message?.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)?.[0];
    if (!email) {
      message.error("Employee email could not be found for this approval request.");
      return;
    }

    try {
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const actor = currentUser.role === "admin" ? "administrator" : "manager";
      const response = await api.post("/auth/forgot-password/approve", {
        email,
        approved,
        reason: approved ? `Approved by ${actor}` : `Declined by ${actor}`,
      });

      message.success(response.data.message || (approved ? "Password reset approved." : "Password reset declined."));
      await loadNotifications();
      setDrawerOpen(false);
      setSelectedNotification(null);
    } catch (error) {
      message.error(error.response?.data?.message || "Unable to update the password reset request.");
    }
  };

  const loadNotifications = async () => {
    const response = await api.get("/notification/getAll");
    setNotifications(response.data.notifications || []);
  };

  const handleMarkAllRead = async () => {
    try {
      await api.put("/notification/mark-all-read");
      await loadNotifications();
    } catch (error) {
      message.error(
        error.response?.data?.message || "Unable to update notifications"
      );
    }
  };

  useEffect(() => {
    loadNotifications().catch((error) => {
      message.error(
        error.response?.data?.message || "Unable to load notifications"
      );
    });
  }, []);

  const filteredNotifications = notifications.filter((notification) => {
    const text = `${notification.title} ${notification.message}`.toLowerCase();
    const matchesSearch = text.includes(filters.search.toLowerCase());
    const matchesType =
      filters.type === "all" || notification.type === filters.type;
    const matchesPriority =
      filters.priority === "all" || notification.priority === filters.priority;
    const matchesDate =
      !filters.date ||
      dayjs(notification.createdAt).isSame(filters.date, "day");

    return matchesSearch && matchesType && matchesPriority && matchesDate;
  });

  return (
    <div className="space-y-6">

      <NotificationsHeader
        onMarkAllRead={handleMarkAllRead}
      />

      <NotificationsCards notifications={notifications} />

      <NotificationsFilters filters={filters} setFilters={setFilters} />

      <NotificationsList
        notifications={filteredNotifications}
        onViewNotification={handleViewNotification}
      />

      <NotificationDrawer
        open={drawerOpen}
        notification={selectedNotification}
        onClose={handleCloseDrawer}
        onMarkRead={handleMarkRead}
        onApproveRequest={(notification) => handlePasswordResetDecision(notification, true)}
        onDeclineRequest={(notification) => handlePasswordResetDecision(notification, false)}
      />

    </div>
  );
}

export default Notifications;