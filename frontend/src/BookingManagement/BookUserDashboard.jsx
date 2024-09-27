import { useEffect, useState } from "react";
import axios from "axios";
import BooksTable from "./BooksTable";
import CustomerTable from "../CustomerSupport/CustomerTable";

function BookUserDashboard() {
  const [books, setBooks] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true); // Start loading as true
  const [userProfile, setUserProfile] = useState(null); // Store user profile details

  useEffect(() => {
    // Fetch the logged-in user's information
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    console.log("Logged In User:", loggedInUser); // Verify the structure and field names

    if (loggedInUser) {
      setUserProfile(loggedInUser); // Set user profile with the logged-in user details

      const fetchData = async () => {
        try {
          const bookResponse = await axios.get("http://localhost:5555/books");
          const customerResponse = await axios.get("http://localhost:5555/customer");

          // Filter bookings and customers based on the logged-in user's username
          const filteredBooks = bookResponse.data.data.filter(book => book.customerName === loggedInUser.username);
          const filteredCustomers = customerResponse.data.data.filter(customer => customer.customerName === loggedInUser.username);

          setBooks(filteredBooks);
          setCustomer(filteredCustomers); // Set customer data
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false); // Set loading to false after all fetches
        }
      };

      fetchData(); // Call the async fetch function
    } else {
      setLoading(false); // If there's no user logged in, stop loading
    }
  }, []);

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
      <br>
      </br>
      <BooksTable books={books} loading={loading} />

      {/* Customer Details Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl my-8">Ticket Details</h1>
      </div>
      <br>
      </br>
      <CustomerTable customer={customer} loading={loading} />
    </div>
  );
}

export default BookUserDashboard;
