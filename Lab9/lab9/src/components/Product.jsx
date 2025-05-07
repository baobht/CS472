import React from "react";

const Product = ({ id, name, price, inStock, changeStatus }) => {
  return (
    <div key={id} style={{ display: "flex", gap: 8, justifyContent: "left" }}>
      <input type="checkbox" checked={inStock} />
      <div
        style={{
          color: inStock ? "green" : "red",
        }}
      >
        {name}
      </div>
      <div>{price}</div>
      <button onClick={() => changeStatus(id)}>Toggle Status</button>
    </div>
  );
};

export default Product;
