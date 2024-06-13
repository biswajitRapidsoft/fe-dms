export function formatDateToIST(timestamp) {
  if (!timestamp) return "NA";
  const utcDate = new Date(timestamp);
  const istOptions = {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return utcDate.toLocaleDateString("en-IN", istOptions);
}

export function formatTimeToIST(timestamp) {
  if (!timestamp) return "NA";
  const utcDate = new Date(timestamp);
  const istOptions = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return utcDate.toLocaleTimeString("en-IN", istOptions);
}
