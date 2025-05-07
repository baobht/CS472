import React, { useState } from "react";
import Product from "./Product";

const ProductsList = () => {
  const [data, setData] = useState([
    { id: 1, name: "Apple", price: 1, inStock: true },
    { id: 2, name: "Banana", price: 1, inStock: false },
    { id: 3, name: "Cherry", price: 2, inStock: true },
  ]);

  const changeStatus = (id) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, inStock: !item.inStock } : item
      )
    );
  };

  return (
    <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
      State Version
      {data.map((ele) => (
        <Product key={ele.id} {...ele} changeStatus={changeStatus} />
      ))}
    </div>
  );
};

export default ProductsList;
