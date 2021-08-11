import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header>
      <StyledNavBar>
        <NavLink to="/" className="list-item">
          <h4 className="list-item">Home</h4>
        </NavLink>
        <NavLink to="/countries" className="list-item">
          <h4>Countries</h4>
        </NavLink>
        <NavLink to="/newactivity" className="list-item">
          <h4>Add/Edit activity</h4>
        </NavLink>
        <NavLink to="/about" className="list-item">
          <h4>About</h4>
        </NavLink>
        <NavLink to="/contact" className="list-item">
          <h4>Contact</h4>
        </NavLink>
      </StyledNavBar>
    </header>
  );
}
