import { useEffect, useState } from "react";
import axios from "axios";
import BooksCard from "../BookingManagement/BooksCard";
import Spinner from "../BookingManagement/Spinner";

function Bookadmin() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        console.log(response.data);
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner /> // Show Spinner while loading
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
}

export default Bookadmin;
