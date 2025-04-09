// components/TimelineItem.jsx
import React, { useRef, useState, useEffect } from "react";

import { parseDate, formatDate } from "../utils/functions";

export default function TimelineItem({ item, offset, zoom, onClick, onUpdate }) {
  const [dragging, setDragging] = useState(false);
  const [currentLeft, setCurrentLeft] = useState(offset(item.start));
  const [initialLeft, setInitialLeft] = useState(0);
  const [startX, setStartX] = useState(0);

  const width = Math.max(offset(item.end) - offset(item.start), zoom);
  const top = item.lane * 50 + 5;

  useEffect(() => {
    setCurrentLeft(offset(item.start));
  }, [item.start, offset]);

  const handleMouseDown = (e) => {
    e.stopPropagation();
    setStartX(e.clientX);
    setInitialLeft(currentLeft);
    setDragging(true);
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      setCurrentLeft(initialLeft + deltaX);
    };

    const handleMouseUp = () => {
      setDragging(false);
      const dayWidth = offset("2025-01-02") - offset("2025-01-01");
      const deltaDays = Math.round((currentLeft - offset(item.start)) / dayWidth);

      const newStart = new Date(parseDate(item.start));
      newStart.setDate(newStart.getDate() + deltaDays);
      const newEnd = new Date(parseDate(item.end));
      newEnd.setDate(newEnd.getDate() + deltaDays);

      if (onUpdate) {
        onUpdate({ ...item, start: formatDate(newStart), end: formatDate(newEnd) });
      }

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, currentLeft, initialLeft, startX, item, offset, onUpdate]);

  return (
    <div
      className="position-absolute bg-primary text-white p-1 rounded shadow-sm"
      style={{
        top,
        left: currentLeft,
        width,
        height: 40,
        whiteSpace: "nowrap",
        cursor: dragging ? "grabbing" : "grab",
        zIndex: dragging ? 1000 : 1,
      }}
      title={`${item.name}: ${item.start} → ${item.end}`}
      onMouseDown={handleMouseDown}
      onClick={onClick}
    >
      {item.name}
    </div>
  );
}
