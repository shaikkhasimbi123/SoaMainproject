/**
 * CSV Export utility for downloading tabular data directly in the browser
 */

export const exportToCSV = (filename, data = [], headers = []) => {
  if (!data || !data.length) {
    alert("No records to export.");
    return false;
  }

  // Generate CSV Header
  const headerRow = headers.map((h) => `"${h.label.replace(/"/g, '""')}"`).join(",");

  // Generate Data Rows
  const contentRows = data.map((item) => {
    return headers
      .map((h) => {
        let val = item[h.key];
        if (val === undefined || val === null) val = "";
        if (typeof val === "object") val = JSON.stringify(val);
        const escaped = String(val).replace(/"/g, '""');
        return `"${escaped}"`;
      })
      .join(",");
  });

  const csvString = [headerRow, ...contentRows].join("\r\n");
  const blob = new Blob(["\uFEFF" + csvString], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename || "academiax_export"}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
};
