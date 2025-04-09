// components/Header.jsx
import React from "react";

export default function Header() {
  return (
    <header className="bg-dark text-white py-3 mb-4">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h4 mb-0">📅 Airtable Timeline</h1>
        <span className="text-light small">Developed by Paulo Melo</span>
      </div>
    </header>
  );
}
