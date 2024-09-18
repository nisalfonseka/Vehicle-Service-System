import { useEffect, useState } from "react";
import axios from "axios";
import BooksTable from "./BooksTable";

function BookUserDashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null); // Store logged-in user's ID

  useEffect(() => {
    // Fetch the logged-in user's information, e.g., from local storage or context
    const loggedInUser = JSON.parse(localStorage.getItem('user')); // Replace with your user fetching logic
    setUserId(loggedInUser?.id);

    if (loggedInUser) {
      setLoading(true);
      axios
        .get("http://localhost:5555/books")
        .then((response) => {
          const filteredBooks = response.data.data.filter(book => book.userId === loggedInUser.id);
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
      <div className="flex justify-center items-center gap-x-4">
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">My Bookings</h1>
      </div>
      <BooksTable books={books} loading={loading} />
    </div>
  );
}

export default BookUserDashboard;
