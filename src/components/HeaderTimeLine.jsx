import React from "react";

import { parseDate, formatDate } from "../utils/functions";

export default function HeaderTimeline({ minDate, maxDate, zoom }) {
  const msInDay = 1000 * 60 * 60 * 24;
  const start = parseDate(minDate);
  const end = parseDate(maxDate);

  const days = [];
  for (let d = new Date(start); d <= end; d = new Date(d.getTime() + msInDay)) {
    days.push(new Date(d));
  }
  //console.log(zoom)

  const headerWidth = zoom<=35 ? 50 : 25;
  return (
    <div className="position-relative bg-dark mb-4" style={{ height: headerWidth }}>
      {days.map((day, idx) => (
        <div
          key={idx}
          className="text-center border-end text-white small"
          style={{
            position: "absolute",
            left: idx * zoom,
            width: zoom,
          }}
        >
          {formatDate(day)}
        </div>
      ))}
    </div>
  );
}
