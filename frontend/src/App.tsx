import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Products from "./pages/products/Products";
import AddProduct from "./pages/addProduct/AddProduct";
import EditProduct from "./pages/editProduct/EditProduct";
import DeleteProduct from "./pages/deleteProduct/DeleteProduct";

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products">
            <Route index element={<Products />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="edit/:id" element={<EditProduct />} />
            <Route path="delete/:id" element={<DeleteProduct />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};
export default App;
