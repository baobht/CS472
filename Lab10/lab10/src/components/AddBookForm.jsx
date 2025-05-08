import React, { useState } from "react";
import { useBookContext } from "../context/BookContext";

const AddBookForm = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const { addBook } = useBookContext();

  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
      />
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        type="text"
      />
      <button
        onClick={() => {
          const newBook = {
            title,
            author,
          };
          addBook(newBook);
          setAuthor("");
          setTitle("");
        }}
        style={{
          display: "flex",
          justifySelf: "flex-end",
          marginBottom: "8px",
        }}
      >
        Add book
      </button>
    </div>
  );
};

export default AddBookForm;
