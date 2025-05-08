import "./App.css";
import BookList from "./components/BookList";
import { BookProvider } from "./context/BookContext";

function App() {
  return (
    <BookProvider>
      <BookList />
    </BookProvider>
  );
}

export default App;
