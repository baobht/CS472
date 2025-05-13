import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import AddBook from "./pages/AddBook/index.jsx";
import { BookProvider } from "./context/BookContext.jsx";
import EditBook from "./pages/EditBook/index.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <BookProvider>
      <Routes>
        <Route index path="/" element={<App />} />
        <Route path="/addBook" element={<AddBook />} />
        <Route path="/editBook/:id" element={<EditBook />} />
      </Routes>
    </BookProvider>
  </BrowserRouter>
);
