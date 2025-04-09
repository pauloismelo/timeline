import React from "react";

export default function TimelineItem({ item, offset, zoom, onclick }) {
    //console.log(onclick);
    const left = offset(item.start);
    const right = offset(item.end);
    const width = right - left || zoom;

    return (
        <div
        className="position-absolute bg-secondary text-white p-1 rounded shadow-sm"
        style={{
            top: item.lane * 50 + 5,
            left,
            width,
            height: 40,
            whiteSpace: "nowrap",
            cursor: "pointer",
        }}
        title={`${item.name}: ${item.start} → ${item.end}`}
        onClick={onclick}
        >
        {item.name}
        </div>
    );
}
