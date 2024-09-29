import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home/Home";
import CreateBook from "./BookingManagement/CreateBooks";
import ShowBook from "./BookingManagement/ShowBook";
import EditBook from "./BookingManagement/EditBook";
import DeleteBook from "./BookingManagement/DeleteBook";
import Header from './Home/Header';
import Footer from './Home/Footer';
import BooksTable from "./BookingManagement/BooksTable";
import BookSingleCard from "./BookingManagement/BookSingleCard";
import RegisterForm from "./UserManagement/register";
import LoginForm from "./UserManagement/login";
import Bookadmin from "./BookingManagement/Bookadmin";
import CreateCustomer from './CustomerSupport/CreateCustomer';
import ShowCustomer from './CustomerSupport/ShowCustomer';
import EditCustomer from './CustomerSupport/EditCustomer';
import DeleteCustomer from './CustomerSupport/DeleteCustomer';
import CustomerCard from './CustomerSupport/CustomerCard.jsx';
import CustomerSingleCard from './CustomerSupport/CustomerSingleCard.jsx';
import CustomerTable from './CustomerSupport/CustomerTable.jsx'
import Profile from "./Home/profile.jsx";
import CustomerOverview from "./CustomerSupport/CustomerOverview.jsx";


function App() {
  const location = useLocation();

  // Determine if we are on a dashboard route
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboardRoute && <Header />} {/* Render Header if not on dashboard route */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/details/:id" element={<ShowBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
        <Route path="/books/table" element={<BooksTable />} />
        <Route path="/books/card" element={<BookSingleCard />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard/Bookadmin" element={<Bookadmin/>}/>
        <Route path='/customer/create' element={<CreateCustomer />} />
      <Route path='/customer/details/:id' element={<ShowCustomer />} />
      <Route path='/customer/edit/:id' element={<EditCustomer />} />
      <Route path='/customer/delete/:id' element={<DeleteCustomer />} />
      <Route path='/customer/card' element={<CustomerCard />} />
      <Route path='/customer/single/:id' element={<CustomerSingleCard />} />
      <Route path='/customer/table' element={<CustomerTable />} />
      <Route path='/profile' element={<Profile />} />
      <Route path="/dashboard/Customeradmin" element={<CustomerOverview/>}/>


      </Routes>

      {!isDashboardRoute && <Footer />} {/* Render Footer if not on dashboard route */}
    </>
  );
}

export default App;