import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Header } from "./components/Header.tsx";
import { ProductProvider } from "./context/ProductContext.tsx";
import "./index.css";
import { Home } from "./pages/Home.tsx";
import { ProductDetail } from "./pages/ProductDetail.tsx";
import { ProductForm } from "./pages/ProductForm.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ProductProvider>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/create" element={<ProductForm />} />
        <Route path="/product/edit/:id" element={<ProductForm />} />
      </Routes>
    </ProductProvider>
  </BrowserRouter>
);
