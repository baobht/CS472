import { useState } from "react";
import { useBookContext } from "../../context/BookContext";
import { useNavigate } from "react-router";

const AddBook = () => {
  const { addBook } = useBookContext();

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      Add Book
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>Author:</div>
        <div>
          <input
            style={{ borderRadius: "8px", padding: "8px" }}
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>Title:</div>
        <div>
          <input
            style={{ borderRadius: "8px", padding: "8px" }}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={() => {
          const newBook = { title, author };
          addBook(newBook);
          navigate("/");
        }}
      >
        Save
      </button>
    </div>
  );
};

export default AddBook;
