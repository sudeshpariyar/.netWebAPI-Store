import React from "react";
import { Menu } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="brand">
        <h2 onClick={() => navigate("/")}>Pet Store</h2>
      </div>
      <div className="hamburger">
        <Menu />
      </div>
      <div className="menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/products/add">Add Product</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
