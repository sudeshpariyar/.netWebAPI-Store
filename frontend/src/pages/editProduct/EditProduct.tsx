import React, { useEffect, useState } from "react";
import "./EditProduct.scss";
import { Button, TextField } from "@mui/material";
import { IProduct } from "../../types/globalTypes";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../constants/urlconstants";

const EditProduct = () => {
  const [product, setProduct] = useState<Partial<IProduct>>({
    title: "",
    brand: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    axios.get(`${baseUrl}/products/${id}`).then((response) =>
      setProduct({
        title: response.data.title,
        brand: response.data.brand,
      })
    );
  }, []);
  const handleForm = () => {
    if (product.brand === "" || product.title === "") {
      alert("Please enter product brand and title.");
    }
    const data: Partial<IProduct> = {
      brand: product.brand,
      title: product.title,
    };
    axios
      .put(`${baseUrl}/products/${id}`, data)
      .then((response) =>
        navigate("/products", { state: { message: "Product Updated..." } })
      )
      .catch((error) => alert("Error occurred..."));
  };
  const handleBackBtnClick = () => {};

  return (
    <div>
      <div className="edit-product">
        <h2>Edit Product</h2>
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
    </div>
  );
};

export default EditProduct;
