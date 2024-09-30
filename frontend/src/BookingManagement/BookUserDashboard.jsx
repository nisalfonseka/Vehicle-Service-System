import { useEffect, useState } from "react";
import axios from "axios";
import BooksTable from "./BooksTable";
import CustomerTable from "../CustomerSupport/CustomerTable";
import BreakdownTable from "../BreakdownService/BreakdownTable";

function BookUserDashboard() {
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [breakdownRequests, setBreakdownRequests] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [loadingBreakdowns, setLoadingBreakdowns] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search input state

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

  // Filter data based on search query (vehicle number)
  const filteredBooks = books.filter((book) =>
    book.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredCustomers = customer.filter((cust) =>
    cust.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredBreakdownRequests = breakdownRequests.filter((breakdown) =>
    breakdown.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

<div className="mb-6">
  <input
    type="text"
    placeholder="Search by vehicle number"
    className="p-2 w-1/3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 ease-in-out"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</div>

      {/* Bookings Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl my-8">Service Appointments</h1>
      </div>
      <br />
      <BooksTable books={filteredBooks} loading={loadingBooks} />

      {/* Customer Details Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl my-8">Ticket Details</h1>
      </div>
      <br />
      <CustomerTable customer={filteredCustomers} loading={loadingBooks} />

      {/* Breakdown Requests Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl my-8">Breakdown History</h1>
      </div>
      <br />
      <BreakdownTable breakdownRequests={filteredBreakdownRequests} loading={loadingBreakdowns} />
    </div>
  );
}

export default BookUserDashboard;
