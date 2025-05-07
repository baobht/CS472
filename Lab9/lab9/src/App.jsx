import "./App.css";
import ProductsListReducer from "./components/ProductsListUseReducer";
import ProductsListState from "./components/ProductsListUseState";

function App() {
  return (
    <>
      <ProductsListState />
      <ProductsListReducer />
    </>
  );
}

export default App;
