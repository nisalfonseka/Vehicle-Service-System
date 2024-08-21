import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBooks";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import Header from './components/Header';
import Footer from './components/Footer';
import BooksTable from "./components/home/BooksTable";
import Dashboard from "./components/dashboard";
import BookSingleCard from "./components/home/BookSingleCard";
import Bookadmin from "./components/Bookadmin";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/details/:id" element={<ShowBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
        <Route path="/books/table" element={<BooksTable/>}/>
        <Route path="/books/card" element={<BookSingleCard/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/Bookadmin" element={<Bookadmin/>}/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
