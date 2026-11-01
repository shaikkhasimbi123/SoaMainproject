import React, { createContext, useContext, useState, useEffect } from "react";
import { getStorageItem, setStorageItem, STORAGE_KEYS } from "../utils/storage";
import { INITIAL_NOTIFICATIONS } from "../data/initialData";
import { generateId } from "../utils/formatters";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    return getStorageItem(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  });

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }, [notifications]);

  const addNotification = ({ title, message, type = "info", link = null, userId = "ALL" }) => {
    const newNotif = {
      id: generateId("NOTIF"),
      userId,
      title,
      message,
      type,
      read: false,
      date: new Date().toISOString(),
      link
    };
    setNotifications((prev) => [newNotif, ...prev]);
    return newNotif;
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationsForUser = (userId) => {
    if (!userId) return notifications.filter((n) => n.userId === "ALL");
    return notifications.filter((n) => n.userId === "ALL" || n.userId === userId);
  };

  const unreadCount = (userId) => {
    return getNotificationsForUser(userId).filter((n) => !n.read).length;
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAllNotifications,
        getNotificationsForUser,
        unreadCount
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
