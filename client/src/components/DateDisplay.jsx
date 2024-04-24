import React, { useState, useEffect } from "react";
import "../templates/date-display.css";

function DateDisplay() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format of the date and time
  const formattedDateTime = currentDateTime.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  return (
    <div className="date-wrapper">
      <div className="dashboard-date">{formattedDateTime}</div>
    </div>
  );
}

export default DateDisplay;
