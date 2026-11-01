import React from "react";

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "blue", // 'blue', 'green', 'amber', 'purple', 'navy'
  badge
}) => {
  const getColorStyles = () => {
    switch (color) {
      case "green":
        return {
          bg: "var(--color-success-bg)",
          iconColor: "var(--color-success)",
          border: "rgba(22, 163, 74, 0.2)"
        };
      case "amber":
        return {
          bg: "var(--color-warning-bg)",
          iconColor: "var(--color-warning)",
          border: "rgba(245, 158, 11, 0.2)"
        };
      case "purple":
        return {
          bg: "var(--color-accent-purple-bg)",
          iconColor: "var(--color-accent-purple)",
          border: "rgba(124, 58, 237, 0.2)"
        };
      case "navy":
        return {
          bg: "rgba(16, 42, 67, 0.08)",
          iconColor: "var(--color-primary-navy)",
          border: "rgba(16, 42, 67, 0.15)"
        };
      case "blue":
      default:
        return {
          bg: "var(--color-light-blue)",
          iconColor: "var(--color-primary-blue)",
          border: "rgba(37, 99, 235, 0.2)"
        };
    }
  };

  const style = getColorStyles();

  return (
    <div
      className="card"
      style={{
        padding: "1.25rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        position: "relative",
        border: `1px solid var(--color-card-border)`
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-text-secondary)" }}>
          {title}
        </span>
        {Icon && (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "var(--radius-md)",
              backgroundColor: style.bg,
              color: style.iconColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon size={20} />
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
        <span
          style={{
            fontSize: "1.75rem",
            fontWeight: 800,
            fontFamily: "var(--font-heading)",
            color: "var(--color-text-primary)"
          }}
        >
          {value}
        </span>
        {badge && (
          <span style={{ fontSize: "0.72rem", fontWeight: 700 }} className="badge badge-info">
            {badge}
          </span>
        )}
      </div>

      {(subtitle || trend) && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
          {trend && (
            <span style={{ color: trend.startsWith("+") ? "var(--color-success)" : "var(--color-text-secondary)", fontWeight: 700 }}>
              {trend}
            </span>
          )}
          <span>{subtitle}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
