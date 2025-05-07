import React, { useReducer } from "react";
import Product from "./Product";

const initialData = [
  { id: 1, name: "Apple", price: 1, inStock: true },
  { id: 2, name: "Banana", price: 1, inStock: false },
  { id: 3, name: "Cherry", price: 2, inStock: true },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STATUS":
      return state.map((item) =>
        item.id === action.id ? { ...item, inStock: !item.inStock } : item
      );

    default:
      return state;
  }
};

const ProductsList = () => {
  const [data, dispatch] = useReducer(reducer, initialData);

  const changeStatus = (id) => {
    dispatch({ type: "UPDATE_STATUS", id });
  };

  return (
    <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
      Reducer Version
      {data.map((ele) => (
        <Product key={ele.id} {...ele} changeStatus={changeStatus} />
      ))}
    </div>
  );
};

export default ProductsList;
