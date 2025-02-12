function timesAgo(storedDate) {
  const now = new Date();
  //date automatically converts to milliseconds since Unix epoch
  //(Jan 1, 1970, UTC), because of JavaScript's automatic type conversion
  //when performing arithmetic operations on new Date() obj
  const diffInSeconds = Math.floor((now - storedDate) / 1000);

  const units = [
    { label: "year", seconds: 31536000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (let unit of units) {
    const value = Math.floor(diffInSeconds / unit.seconds);
    if (value > 0) {
      return `${value} ${unit.label}${value > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}

module.exports = timesAgo;
