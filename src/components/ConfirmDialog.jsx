import React from "react";
import Modal from "./Modal";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed with this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning", // 'warning', 'danger', 'info'
  isLoading = false
}) => {
  const getIcon = () => {
    switch (type) {
      case "danger":
        return <AlertTriangle size={32} style={{ color: "var(--color-error)" }} />;
      case "warning":
        return <AlertTriangle size={32} style={{ color: "var(--color-warning)" }} />;
      case "info":
      default:
        return <Info size={32} style={{ color: "var(--color-primary-blue)" }} />;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="480px">
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.5rem" }}>
        <div style={{ flexShrink: 0, marginTop: "0.25rem" }}>{getIcon()}</div>
        <div style={{ fontSize: "0.925rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
          {message}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
        <button className="btn btn-outline" onClick={onClose} disabled={isLoading}>
          {cancelText}
        </button>
        <button
          className={`btn ${type === "danger" ? "btn-danger" : type === "warning" ? "btn-primary" : "btn-primary"}`}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : confirmText}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
