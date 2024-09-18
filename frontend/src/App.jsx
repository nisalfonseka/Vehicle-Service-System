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
import BookUserDashboard from "./BookingManagement/BookUserDashboard";
import Bookadmin from "./BookingManagement/Bookadmin";


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
        <Route path="/BookUserDashboard" element={<BookUserDashboard />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard/Bookadmin" element={<Bookadmin/>}/>

      </Routes>

      {!isDashboardRoute && <Footer />} {/* Render Footer if not on dashboard route */}
    </>
  );
}

export default App;
