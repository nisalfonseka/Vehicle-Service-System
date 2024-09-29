import {Routes, Route, useLocation, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react';
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
import DashboardHeader from "./AdminDashboard/dashboardHeader"
import BookOverview from "./AdminDashboard/BookOverview"

//online store 
import AdminHome from './OnlineStore/pages/Home/AdminHome';
import ManagerHome from './OnlineStore/pages/Home/managerHome';
import ItemList from './OnlineStore/pages/Home/InventoryItems';
import UpdateItem from './OnlineStore/components/updateItem';
import Store from './OnlineStore/pages/Home/Store';
import Cart from './OnlineStore/pages/Home/Cart';
import Checkout from './OnlineStore/components/checkout';
import OrderList from './OnlineStore/pages/Home/OrderList';
import OrderDetails from './OnlineStore/pages/Home/OrderDetails';
import ItemDetails from './OnlineStore/pages/Home/ItemDetails';
import CardManagementPage from './OnlineStore/components/CardManagementPage';
import MyOrders from './OnlineStore/components/MyOrders';
import CancelledOrders from "./OnlineStore/components/CancelledOrders";
import CompletedOrders from "./OnlineStore/components/CompletedOrders";
import PendingOrders from "./OnlineStore/components/PendingOrders";
import SalesSummary from "./OnlineStore/pages/Home/SalesSummary";

//inventory
import SenuraInventoryItems from "./InventoryManagement/s-InventoryItems";
import CategoriesList from './InventoryManagement/CategoriesList';
import AddCategoryForm from './InventoryManagement/addCatagory';
import UpdateCategory from './InventoryManagement/UpdateCategory';
import CategoryDetail from './InventoryManagement/CategoryDetail';
import AddItemForm from './InventoryManagement/AddItem';
import ItemDetailsssss from "./InventoryManagement/ItemDetails";
import InventorySummaryReport from './InventoryManagement/summery';
import BooksCard from "./BookingManagement/BooksCard";


//finance 
import Dashboard from './FinanceManagement/Dashboard';
import InvoiceList from './FinanceManagement/invoiceList';
import Navbar from './FinanceManagement/Navbar';
import Income from './FinanceManagement/income';
import CreateIncome from './FinanceManagement/CreateIncome';
import CreateExpenses from './FinanceManagement/CreateExpenses';
import Expenses from './FinanceManagement/expenses';
import UserProfile from './FinanceManagement/userProfile';


//employeee
import HomeEmp from './EmployeeManagement/Home';
import Employee from './EmployeeManagement/Employee';
import CreateRecords from './EmployeeManagement/CreateRecords';
import EditRecord from './EmployeeManagement/EditRecord';
import DeleteRecord from './EmployeeManagement/DeleteRecord';
import Profile from './EmployeeManagement/Profile';
import DashboardEmp from './EmployeeManagement/Dashboard';
import Shiftschedular from './EmployeeManagement/Shiftschedular';
import AddShifts from './EmployeeManagement/AddShifts';


function App() {
  const [cart, setCart] = useState([]);
  const location = useLocation();

  // Determine if we are on a dashboard route
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const isEmployeeDashboardRoute = location.pathname.startsWith('/dashboard/emp');

  return (
    <>
      {!isDashboardRoute && <Header />} {/* Render Header if not on dashboard route */}
      {isDashboardRoute && <DashboardHeader />}
     
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/details/:id" element={<ShowBook />} />
        <Route path="/dashboard/books/details/:id" element={<ShowBook />} />
        <Route path="/dashboard/books/edit/:id" element={<EditBook />} />
        <Route path="/dashboard/books/delete/:id" element={<DeleteBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
        <Route path="/books/table" element={<BooksTable />} />
        <Route path="/books/cardview" element={<BooksCard />} />
        <Route path="/books/card" element={<BookSingleCard />} />
        <Route path="/BookUserDashboard" element={<BookUserDashboard />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard/Bookadmin" element={<Bookadmin/>}/>
        <Route path="/dashboard/header" element={<dashboardHeader/>}/>
        <Route path="/dashboard/books/overview" element={<BookOverview/>}/>

          <Route path="/items" element={<ItemList />} />
          <Route path="/salesmanager" element={<AdminHome/>} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/managerhome" element={<ManagerHome />} />
          <Route path="/inventory" element ={<ItemList />}/>
          <Route path="/updateItem/:id" element={<UpdateItem />} />
          <Route path="/orderlist" element={<OrderList />}/>
          <Route path ="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
          <Route path="/store-items/:itemId" element={<ItemDetails cart={cart} setCart={setCart} />} />
          <Route path="/Store" element={<Store cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />
          <Route path="/CardManagementPage" element={<CardManagementPage />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/cancel" element={<CancelledOrders />} />
          <Route path="/finish" element={<CompletedOrders />} />
          <Route path="/report" element={<SalesSummary />} />
          <Route path="/pending" element={<PendingOrders />} />

          <Route path="/senura" element ={<SenuraInventoryItems />}/>
          <Route path="/addcatagory" element ={<AddCategoryForm />}/>
          <Route path="/catagory" element ={<CategoriesList />}/>
          <Route path="/additem" element ={<AddItemForm />}/>
          <Route path="/categories/:id" element={<CategoryDetail />} />
          <Route path="/categories/:id/edit" element={<UpdateCategory />} />


          <Route path="/dashboard/finance/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/finance/invoices" element={<InvoiceList />} />
        <Route path="/dashboard/finance/incomes" element={<Income />} />
        <Route path="/dashboard/finance/create-income" element={<CreateIncome />} />
        <Route path="/dashboard/finance/expenses" element={<Expenses />} />
        <Route path="/dashboard/finance/create-expense" element={<CreateExpenses />} />
        <Route path="/dashboard/finance/profile" element={<UserProfile />} />
        <Route path="/dashboard/header" element={<Navbar />} />
          

        <Route path='/dashboard/emp' element={<DashboardEmp /> }>
        <Route path='/dashboard/emp/home' element={<HomeEmp />}></Route>
         <Route path='/dashboard/emp/employee' element={<Employee />}> </Route>
        <Route path='/dashboard/emp/shiftschedular' element={<Shiftschedular  />}></Route>
        <Route path='/dashboard/emp/profile' element={<Profile />}></Route>
        <Route path='/dashboard/emp/add_shifts' element={<AddShifts/>}></Route>
        <Route path='/dashboard/emp/add_employee' element={<CreateRecords />}></Route>
        <Route path='/dashboard/emp/edit_employee/:id' element={<EditRecord />}></Route>
        <Route path='/dashboard/emp/delete_employee/:id' element={<DeleteRecord />}></Route>
        </Route>

      </Routes>

      {!isDashboardRoute && <Footer />}
       {/* Render Footer if not on dashboard route */}
    </>
  );
}

export default App;
