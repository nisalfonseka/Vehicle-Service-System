import { useEffect, useState } from "react";
import axios from "axios";
import BooksTable from "./BooksTable";
import CustomerTable from "../CustomerSupport/CustomerTable";
import BreakdownTable from "../BreakdownService/BreakdownTable";

function BookUserDashboard() {
  const [books, setBooks] = useState([]);
  const [breakdownRequests, setBreakdownRequests] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingBreakdowns, setLoadingBreakdowns] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (loggedInUser) {
      setUserProfile(loggedInUser);

      // Fetch books and customer data for the logged-in user
      const fetchData = async () => {
        setLoadingBooks(true);
        try {
          const [bookResponse, customerResponse] = await Promise.all([
            axios.get("http://localhost:5555/books"),
            axios.get("http://localhost:5555/customer"),
          ]);

          // Filter books and customers by logged-in user's username
          const filteredBooks = bookResponse.data.data.filter(
            (book) => book.customerName === loggedInUser.username
          );
          const filteredCustomers = customerResponse.data.data.filter(
            (customer) => customer.customerName === loggedInUser.username
          );

          setBooks(filteredBooks);
          setCustomer(filteredCustomers);
        } catch (error) {
          console.error("Error fetching book/customer data:", error);
        } finally {
          setLoadingBooks(false);
        }
      };

      fetchData();
    }
  }, []);

  useEffect(() => {
    // Fetch breakdown requests
    const fetchBreakdownRequests = async () => {
      setLoadingBreakdowns(true);
      try {
        const response = await axios.get("http://localhost:5555/breakdownRequests");
        
        // Filter breakdown requests by logged-in user's username
        const filteredBreakdowns = response.data.data.filter(
          (breakdownRequest) => breakdownRequest.customerName === userProfile?.username
        );
        
        setBreakdownRequests(filteredBreakdowns);
      } catch (error) {
        console.error("Error fetching breakdown requests:", error);
      } finally {
        setLoadingBreakdowns(false);
      }
    };

    if (userProfile) {
      fetchBreakdownRequests(); // Only fetch breakdowns when the user profile is available
    }
  }, [userProfile]);

  return (
    <div className="p-4">
      {/* User Profile Section */}
      {userProfile && (
        <div className="bg-white shadow-md rounded p-4 mb-8">
          <div className="flex items-center gap-4">
            <div>
              <p><strong>Hi {userProfile.username}</strong></p>
            </div>
          </div>
        </div>
      )}

      {/* Bookings Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl my-8">Service Appointments</h1>
      </div>
      <br></br>
      <BooksTable books={books} loading={loadingBooks} />

      {/* Customer Details Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl my-8">Ticket Details</h1>
      </div><br></br>
      <CustomerTable customer={customer} loading={loadingBooks} />

      {/* Breakdown Requests Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl my-8">Breakdown History</h1>
      </div><br></br>
      <BreakdownTable breakdownRequests={breakdownRequests} loading={loadingBreakdowns} />
    </div>
  );
}

export default BookUserDashboard;
