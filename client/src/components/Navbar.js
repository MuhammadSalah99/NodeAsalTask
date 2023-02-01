import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Add a Book</Link>
        </li>
        <li>
          <Link to="/search">Find a book</Link>
        </li>
        <li>
          <Link to="/reserve">Reserve a book</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
