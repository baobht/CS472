import { useBookContext } from "../context/BookContext";
import { useNavigate } from "react-router";

const BookList = () => {
  const { books, deleteBook, loading, error } = useBookContext();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  return books.length || error ? (
    <>
      <button
        onClick={() => {
          navigate("/addBook");
        }}
        style={{
          marginBottom: "24px",
          width: "100%",
        }}
      >
        Add book
      </button>
      <table style={{ border: "1px solid white", width: "100%" }}>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
          {books.map((book) => (
            <tr key={book.id} style={{ border: "1px solid white" }}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td style={{ display: "flex" }}>
                <button onClick={() => navigate(`/editBook/${book.id}`)}>
                  Update
                </button>
                <button onClick={() => deleteBook(book)}>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <div>No book available</div>
  );
};

export default BookList;
