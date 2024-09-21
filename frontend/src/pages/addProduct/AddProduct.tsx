import React, { useState } from "react";
import "./AddProduct.scss";
import { Button, TextField } from "@mui/material";
import { IProduct } from "../../types/globalTypes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants/urlconstants";

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState<Partial<IProduct>>({
    title: "",
    brand: "",
  });
  const navigate = useNavigate();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const handleForm = () => {
    if (product.brand === "" || product.title === "") {
      alert("Please enter product brand and title.");
    }
    const data: Partial<IProduct> = {
      brand: product.brand,
      title: product.title,
    };
    axios
      .post(`${baseUrl}/products`, data)
      .then((response) =>
        navigate("/products", { state: { message: "Product Created..." } })
      )
      .catch((error) => alert("Error occurred..."));
  };
  const handleBackBtnClick = () => {};
  return (
    <div className="add-product">
      <h2>AddProduct</h2>
      <TextField
        autoComplete="off"
        label="Brand"
        variant="outlined"
        name="brand"
        value={product.brand}
        onChange={changeHandler}
      />
      <TextField
        autoComplete="off"
        label="Title"
        variant="outlined"
        name="title"
        value={product.title}
        onChange={changeHandler}
      />
      <div>
        <Button variant="outlined" color="primary" onClick={handleForm}>
          Save
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
  );
};
export default AddProduct;
