const toNepaliTime = (isoString) => {
  const nepaliTime = new Date(isoString).toLocaleString("en-US", {
    timeZone: "Asia/Kathmandu",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return nepaliTime;
};

export default toNepaliTime;
