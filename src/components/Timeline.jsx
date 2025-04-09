import React, { useState } from "react";

import TimelineItem from "./TimelineItem";
import HeaderTimeline from "./HeaderTimeLine";
import Modal from "./Modal";
import { parseDate } from "../utils/functions";


function diffInDays(dateA, dateB) {
  const msInDay = 1000 * 60 * 60 * 24;
  return Math.floor((parseDate(dateA) - parseDate(dateB)) / msInDay);
}

export default function Timeline({ items }) {
    const [zoom, setZoom] = useState(50); 
    const [selectedItem, setSelectedItem] = useState(null); 

    const handleUpdate = (updatedItem) => {
        const updatedList = itemList.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
        );
        setItemList(assignLanes(updatedList)); // reatribui as lanes após a atualização
    };

    const dates = items.flatMap((item) => [item.start, item.end]);
    const minDate = dates.reduce((min, d) => (parseDate(d) < parseDate(min) ? d : min), dates[0]);
    const maxDate = dates.reduce((max, d) => (parseDate(d) > parseDate(max) ? d : max), dates[0]);
    const totalDays = diffInDays(maxDate, minDate) + 1;

    const offset = (date) => diffInDays(date, minDate) * zoom;
    const lanes = Math.max(...items.map((item) => item.lane)) + 1;

    console.log(selectedItem);

    return (
        <div>
        <div className="d-flex gap-2 mb-2">
            <button
            onClick={() => setZoom((z) => Math.min(z + 5, 100))}
            className="btn btn-outline-primary btn-sm"
            >
            Zoom In
            </button>
            <button
            onClick={() => setZoom((z) => Math.max(z - 5, 5))}
            className="btn btn-outline-secondary btn-sm"
            >
            Zoom Out
            </button>
        </div>
        <div className="position-relative border overflow-auto" style={{ height: lanes * 50 }}>
            <div style={{ width: totalDays * zoom, position: "relative" }}>
                <HeaderTimeline minDate={minDate} maxDate={maxDate} zoom={zoom} />
                <div style={{ position: "relative", height: lanes * 50 }}>
                {items.map((item) => (
                    <TimelineItem
                    key={item.id}
                    item={item}
                    offset={offset}
                    zoom={zoom}
                    onclick={() => setSelectedItem(item)}
                    />
                    
                ))}
                </div>
            </div>
        </div>

        {selectedItem && (
            <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
        </div>
    );
}