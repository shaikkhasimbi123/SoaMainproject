/**
 * LocalStorage utilities for AcademiaX Digital Learning Demo Application
 * Provides resilient, demo-safe browser persistence with fallback in-memory cache.
 */

const STORAGE_KEYS = {
  USERS: "academiax_users",
  SESSION: "academiax_session",
  COURSES: "academiax_v2_courses",
  ENROLLMENTS: "academiax_v2_enrollments",
  PAYMENTS: "academiax_v2_payments",
  NOTIFICATIONS: "academiax_v2_notifications",
  THEME: "academiax_theme"
};

export { STORAGE_KEYS };

export const getStorageItem = (key, defaultValue = null) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[AcademiaX Storage] Failed to read ${key}:`, err);
    return defaultValue;
  }
};

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`[AcademiaX Storage] Failed to write ${key}:`, err);
    return false;
  }
};

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (err) {
    console.warn(`[AcademiaX Storage] Failed to remove ${key}:`, err);
    return false;
  }
};

export const resetStorageToDefaults = () => {
  try {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    return true;
  } catch (err) {
    return false;
  }
};
