import React, { useEffect } from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, subtitle, children, maxWidth = "600px" }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content"
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--color-card-border)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between"
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>{title}</h3>
            {subtitle && (
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              padding: "0.35rem",
              borderRadius: "var(--radius-md)",
              color: "var(--color-text-secondary)",
              transition: "all var(--transition-fast)"
            }}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: "1.5rem" }}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
