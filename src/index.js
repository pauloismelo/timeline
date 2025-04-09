import React from "react";
import ReactDOM from "react-dom/client";
import timelineItems from "./timelineItems.js";
import assignLanes from "./assignLanes.js";
import Timeline from "./components/Timeline.jsx";
import Header from "./components/Header.jsx";

import "bootstrap/dist/css/bootstrap.min.css";



function App() {
  const itemsWithLanes = assignLanes(timelineItems); //Add lanes to items
  return (
    <>
    <Header />
    <div className="container mt-4">
      <p>{itemsWithLanes.length} timeline items to render</p>
      <Timeline items={itemsWithLanes} />
    </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);