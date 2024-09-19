import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import CustomerTable from "../components/home/CustomerTable";
import CustomerCard from "../components/home/CustomerCard";

function Home() {
  const [customer, setCUSTOMER] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/customer")
      .then((response) => {
        console.log(response.data);
        setCUSTOMER(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
       
    <div className='p-4'>
   
    <div className='flex justify-center items-center gap-x-4'>
      <button
        className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
        onClick={() => setShowType('table')}
      >
        Table
      </button>
      <button
        className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
        onClick={() => setShowType('card')}
      >
        Card
      </button>
    </div>
    <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Ticket Status</h1>
        <Link to={"./customer/create"}>
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (<Spinner />) : showType === "table" ? (<CustomerTable customer={customer} />) : (<CustomerCard customer={customer} />)}
    </div>
  );
}


export default Home;
