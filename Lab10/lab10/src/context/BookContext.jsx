// BookContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
const BookContext = createContext(null);
const API_URL = "https://67d17ef590e0670699ba5929.mockapi.io/books";
export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading] = useState(false);
  const [error, setError] = useState(null);

  // Implement CRUD functions and useEffect here

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const data = await fetch(API_URL)
      .then((data) => data.json())
      .catch((error) => setError(error));
    setBooks(data);
  };

  const addBook = async (newBook) => {
    await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });
    getBooks();
  };
  const updateBook = async (updatedBook) => {
    await fetch(`${API_URL}/${updatedBook.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
    });
    getBooks();
  };
  const deleteBook = async (e) => {
    await fetch(`${API_URL}/${e.id}`, {
      method: "DELETE",
    });
    getBooks();
  };
  return (
    <BookContext.Provider
      value={{ books, addBook, updateBook, deleteBook, loading, error }}
    >
      {children}
    </BookContext.Provider>
  );
};
export const useBookContext = () => useContext(BookContext);
