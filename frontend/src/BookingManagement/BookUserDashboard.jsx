import { useEffect, useState } from "react";
import axios from "axios";
import BooksTable from "./BooksTable";

function BookUserDashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // Store user profile details

  useEffect(() => {
    // Fetch the logged-in user's information
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    console.log("Logged In User:", loggedInUser); // Verify the structure and field names

    if (loggedInUser) {
      setUserProfile(loggedInUser); // Set user profile with the logged-in user details

      setLoading(true);
      axios
        .get("http://localhost:5555/books")
        .then((response) => {
          // Filter bookings based on the logged-in user's username
          const filteredBooks = response.data.data.filter(book => book.customerName === loggedInUser.username);
          setBooks(filteredBooks);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
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
              <p> <strong>Hi {userProfile.username}</strong></p>
              </div>
          </div>
        </div>
      )}

      {/* Bookings Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl my-8">My Bookings</h1>
      </div>
      <BooksTable books={books} loading={loading} />
    </div>
  );
}

export default BookUserDashboard;
