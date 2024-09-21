import React, { useEffect, useState } from "react";
import "./DeleteProduct.scss";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../constants/urlconstants";
import { IProduct } from "../../types/globalTypes";

const DeleteProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = () => {
    axios
      .delete(`${baseUrl}/products/${id}`)
      .then((response) =>
        navigate("/products", { state: { message: "Product Deleted..." } })
      )
      .catch((error) => alert("Error occurred..."));
  };
  const handleBackBtnClick = () => {
    navigate("/products");
  };

  return (
    <div>
      <div className="delete-product">
        <h2>Delete Product</h2>
        <h4> Are you sure?</h4>

        <div>
          <Button variant="outlined" color="primary" onClick={handleDelete}>
            Confirm
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBackBtnClick}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
