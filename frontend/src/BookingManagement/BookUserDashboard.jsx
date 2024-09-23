import { useEffect, useState } from "react";
import axios from "axios";
import BooksTable from "./BooksTable";
import BreakdownTable from "../BreakdownService/BreakdownTable";

function BookUserDashboard() {
  const [books, setBooks] = useState([]);
  const [breakdownRequests, setBreakdownRequests] = useState([]); // State for breakdown requests
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // Store user profile details

  useEffect(() => {
    // Fetch the logged-in user's information
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    console.log("Logged In User:", loggedInUser); // Verify the structure and field names

    if (loggedInUser) {
      setUserProfile(loggedInUser); // Set user profile with the logged-in user details

      setLoading(true);
      
      // Fetch books for the logged-in user
      axios
        .get("http://localhost:5555/books")
        .then((response) => {
          const filteredBooks = response.data.data.filter(book => book.customerName === loggedInUser.username);
          setBooks(filteredBooks);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });

      // Fetch breakdown requests for the logged-in user
      axios
        .get("http://localhost:5555/breakdownRequests")
        .then((response) => {
          const filteredRequests = response.data.data.filter(request => request.customerName === loggedInUser.username);
          setBreakdownRequests(filteredRequests);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
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
        <h1 className="text-2xl my-8">My Bookings</h1>
      </div>
      <BooksTable books={books} loading={loading} />

      {/* Breakdown Requests Section */}
      <h1 className="text-2xl my-8">My Breakdown Requests</h1>
      <BreakdownTable breakdownRequests={breakdownRequests} loading={loading} />
    </div>
  );
}

export default BookUserDashboard;
