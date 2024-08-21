import { useEffect, useState } from "react";
import axios from "axios";

import BooksCard from "../BookingManagement/BooksCard";



function Bookadmin() {
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
       
  
      
        
        
          <BooksCard books={books} />
       
      
    );
  }
  
  
  export default Bookadmin;
  