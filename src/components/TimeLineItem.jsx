import React, { useRef, useState } from "react";
import EditName from "./EditName";

export default function TimelineItem({ item, offset, zoom, onclick }) {
    const ref = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState(offset(item.start));

    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(item.name);
    const [hasMoved, setHasMoved] = useState(false); //just for verify if the card has moved and block to open the modal
    const clickTimeoutRef = useRef(null);

  
    const width = Math.max(offset(item.end) - offset(item.start), zoom);
    const top = item.lane * 50 + 5;
  
    const handleMouseDown = (e) => {
        //Here I could to work with globalState bringing the function in the props and managing the items in a state inside the index.js
        //But I prefered to use the local function to focus in the test's requirements
        e.stopPropagation();
        const startX = e.clientX;
        const initialLeft = ref.current.offsetLeft;
        setHasMoved(false);
    
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            if (Math.abs(deltaX) > 2) {
                setHasMoved(true);
                setDragging(true);
                setPosition(initialLeft + deltaX);
            }
        };
    
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);

            setTimeout(() => setDragging(false), 100);
        };
    
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };
    
    const handleClick = (e) => {
        if (hasMoved) return;
    
        if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
            clickTimeoutRef.current = null;
            setEditing(true); // double click
          } else {
            clickTimeoutRef.current = setTimeout(() => {
              clickTimeoutRef.current = null;
              if (onclick) onclick(item); // single click
            }, 250);
          }
    };

    const handleBlur = () => {
        //Here I could to edit the array or maybe call a endpoint to update the name if this name arrive of one database, for example
        setEditing(false);
    };

    
    const handleKeyDown = (e) => {
        //console.log(e.key)
        if (e.key === "Enter") {
          setEditing(false); //for simulate saving with enter tab
        } else if (e.key === "Escape") {
            setName(item.name); // Revert to original name
            setEditing(false);
        }
    };

    
  
    return (
      <div
        ref={ref}
        className="position-absolute bg-secondary text-white p-1 rounded shadow-sm"
        style={{
          top,
          left: position,
          width,
          height: 40,
          whiteSpace: "nowrap",
          cursor: dragging ? "grabbing" : "grab",
          zIndex: dragging ? 1000 : 1,
        }}
        title={`${item.name}: ${item.start} to ${item.end} - Double click to open details`}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
      >
        {editing ? (
            <EditName name={name} handleName={setName} handleBlur={handleBlur} handleKeyDown={handleKeyDown}  />
        ) : (
            name
        )}
      </div>
    );
  }
