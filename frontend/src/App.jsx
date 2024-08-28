import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import CreateBook from "./BookingManagement/CreateBooks";
import ShowBook from "./BookingManagement/ShowBook";
import EditBook from "./BookingManagement/EditBook";
import DeleteBook from "./BookingManagement/DeleteBook";
import Header from './Home/Header';
import Footer from './Home/Footer';
import BooksTable from "./BookingManagement/BooksTable";
import Dashboard from "./BookingManagement/dashboard";
import BookSingleCard from "./BookingManagement/BookSingleCard";
import Bookadmin from "./BookingManagement/Bookadmin";
import './Home/styles.css';
import ContactForm from "./CustomerSupport/CreateCustomer";

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
        <Route path="/support/create" element={<ContactForm/>}/>

      </Routes>

      <Footer />
    </>
  );
}

export default App;
