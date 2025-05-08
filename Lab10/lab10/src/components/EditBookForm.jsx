import React, { useState } from "react";
import { useBookContext } from "../context/BookContext";

const EditBookForm = ({ book, setIsEdit }) => {
  const { updateBook } = useBookContext();
  const [name, setName] = useState(book.author);
  const [title, setTitle] = useState(book.title);
  return (
    <tr style={{ border: "1px solid white" }}>
      <td>{book.id}</td>
      <td>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td style={{ display: "flex" }}>
        <button
          onClick={() => {
            const newBook = { ...book, title, author: name };
            updateBook(newBook);
            setIsEdit(false);
          }}
        >
          Save
        </button>
        <button>x</button>
      </td>
    </tr>
  );
};

export default EditBookForm;
