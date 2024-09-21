import React from "react";
import "./HomePage.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import background from "../../assets/test.jpg";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <h1>Welcome to the store</h1>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate("/products")}
      >
        Product List
      </Button>
      <img src={background} alt="background" />
    </div>
  );
};

export default HomePage;
