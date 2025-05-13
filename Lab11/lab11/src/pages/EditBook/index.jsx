import { useEffect, useState } from "react";
import { useBookContext } from "../../context/BookContext";
import { useNavigate, useParams } from "react-router";

const EditBook = () => {
  const { books, updateBook } = useBookContext();
  const params = useParams();
  const { id } = params;
  const book = books.find((book) => {
    return book.id === id;
  });
  const [author, setAuthor] = useState(book?.author);
  const [title, setTitle] = useState(book?.title);
  const navigate = useNavigate();

  useEffect(() => {
    setAuthor(book?.author);
    setTitle(book?.title);
  }, [book]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      Update Book
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
          const newBook = { ...book, title, author };
          updateBook(newBook);
          navigate("/");
        }}
      >
        Save
      </button>
    </div>
  );
};

export default EditBook;
