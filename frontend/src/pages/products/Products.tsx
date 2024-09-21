import React, { useEffect, useState } from "react";
import "./Product.scss";
import axios from "axios";
import { baseUrl } from "../../constants/urlconstants";
import { IProduct } from "../../types/globalTypes";
import { Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Products: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<IProduct[]>(`${baseUrl}/products`);
        setIsLoading(false);
        setProducts(response.data);
        if (location.state) {
          Swal.fire({
            icon: "success",
            title: location?.state?.message,
            timer: 1000,
          });
          navigate(location.pathname, { replace: true });
        }
      } catch (error) {
        alert("Something went wrong");
      }
    };
    getAllProducts();
  }, []);
  const handleEditNavigation = (id: string) => {
    navigate(`/products/edit/${id}`);
  };
  const handleDeleteNavigation = (id: string) => {
    navigate(`/products/delete/${id}`);
  };

  return (
    <div className="products">
      <h1>Product List</h1>

      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          {products.length === 0 ? (
            <h2>No Products</h2>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Brand</th>
                    <th>Creation Time</th>
                    <th>Updated Time</th>
                    <th>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.title}</td>
                      <td>{product.brand}</td>
                      <td>{moment(product.createdAt).fromNow()}...</td>
                      <td>{moment(product.updatedAt).fromNow()}...</td>
                      <td>
                        <Button
                          variant="outlined"
                          color="warning"
                          sx={{ mx: 3 }}
                          onClick={() => handleEditNavigation(product.id)}
                        >
                          <Edit />
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteNavigation(product.id)}
                        >
                          <Delete />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Products;
