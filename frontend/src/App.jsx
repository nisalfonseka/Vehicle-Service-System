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
import ShowCustomer from "./CustomerSupport/ShowCustomer"
import EditCustomer from "./CustomerSupport/EditCustomer"
import DeleteCustomer from "./CustomerSupport/DeleteCustomer"
import CustomerTable from "./CustomerSupport/CustomerTable";
import CustomerSingleCard from "./CustomerSupport/CustomerSingleCard";
import CustomerCard from "./CustomerSupport/CustomerCard";



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
        <Route path="/support/ShowCustomer" element={<ShowCustomer/>}/>
        <Route path="/support/edit/:id" element={<EditCustomer/>}/>
        <Route path="/support/delete/:id" element={<DeleteCustomer/>}/>

        <Route path='/support/details/:id' element={<CustomerTable  />} />
        <Route path='/support/card/:id' element={<CustomerCard />} />
        <Route path='/support/single/:id' element={<CustomerSingleCard />} />

       

        


      </Routes>

      <Footer />
    </>
  );
}

export default App;
