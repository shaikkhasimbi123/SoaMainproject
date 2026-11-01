/**
 * Formatting utilities for AcademiaX Digital Learning
 */

// Formats number to Indian Rupee (INR) format (e.g., ₹24,500)
export const formatINR = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
};

// Formats ISO or YYYY-MM-DD date string to readable format
export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  } catch (err) {
    return dateString;
  }
};

// Formats Date and Time
export const formatDateTime = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch (err) {
    return dateString;
  }
};

// Calculates DTI (Detailed Tuition Invoice) itemized components if not already explicit
export const calculateDTI = (totalFee, customDti = null) => {
  const fee = Number(totalFee) || 0;
  if (customDti && customDti.baseTuition) {
    const base = Number(customDti.baseTuition) || 0;
    const lab = Number(customDti.techLabSurcharge) || 0;
    const lib = Number(customDti.digitalLibraryFee) || 0;
    const exam = Number(customDti.examLevy) || 0;
    return {
      baseTuition: base,
      techLabSurcharge: lab,
      digitalLibraryFee: lib,
      examLevy: exam,
      institutionalTax: 0,
      total: base + lab + lib + exam || fee
    };
  }

  // Standard institutional percentage breakdown for DTI
  const baseTuition = Math.round(fee * 0.78);
  const techLabSurcharge = Math.round(fee * 0.12);
  const digitalLibraryFee = Math.round(fee * 0.05);
  const examLevy = fee - (baseTuition + techLabSurcharge + digitalLibraryFee);

  return {
    baseTuition,
    techLabSurcharge,
    digitalLibraryFee,
    examLevy,
    institutionalTax: 0,
    total: fee
  };
};

// Generates unique IDs
export const generateId = (prefix = "AX") => {
  const time = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${time}-${rand}`;
};
