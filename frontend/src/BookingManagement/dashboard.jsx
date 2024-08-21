import { useEffect, useState } from "react";
import axios from "axios";
import BooksTable from "../components/home/BooksTable";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  useEffect(() => {
    setLoading(true);
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
     
    
     
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">My Bookings</h1>
      </div>
      <BooksTable books={books} />
    </div>
  );
}


export default Dashboard;
