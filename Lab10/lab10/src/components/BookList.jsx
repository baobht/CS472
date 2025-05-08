import React, { useState } from "react";
import { useBookContext } from "../context/BookContext";
import AddBookForm from "./AddBookForm";
import EditBookForm from "./EditBookForm";

const BookList = () => {
  const { books, deleteBook, loading, error } = useBookContext();
  const [isEdit, setIsEdit] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  return books.length || error ? (
    <>
      <AddBookForm />

      <table style={{ border: "1px solid white", width: "100%" }}>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Action</th>
        </tr>
        {books.map((book) =>
          book.id !== isEdit ? (
            <tr style={{ border: "1px solid white" }}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td contentEditable={isEdit} onInput={(e) => console.log(e)}>
                {book.author}
              </td>
              <td style={{ display: "flex" }}>
                <button onClick={() => setIsEdit(book.id)}>Update</button>
                <button onClick={() => deleteBook(book)}>x</button>
              </td>
            </tr>
          ) : (
            <EditBookForm book={book} setIsEdit={setIsEdit} />
          )
        )}
      </table>
    </>
  ) : (
    <div>No book available</div>
  );
};

export default BookList;
