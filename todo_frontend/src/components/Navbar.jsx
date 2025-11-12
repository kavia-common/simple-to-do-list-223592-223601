import React from "react";
import { FiCheckSquare } from "react-icons/fi";

/**
 * PUBLIC_INTERFACE
 * Navbar component with brand and actions area (children on the right).
 */
export default function Navbar({ children }) {
  return (
    <nav className="navbar" role="navigation" aria-label="Primary">
      <div className="container nav-inner">
        <div className="brand" aria-label="To-Do Application">
          <div aria-hidden="true" className="brand-icon" />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <FiCheckSquare aria-hidden="true" className="icon icon-primary" style={{ fontSize: 22 }} />
            <div>
              <div className="brand-title">Simple To-Do</div>
              <div className="helper">Stay on top of your day</div>
            </div>
          </div>
        </div>
        <div aria-label="Toolbar actions">{children}</div>
      </div>
    </nav>
  );
}
