import { useEffect, useState } from "react";
import axios from "axios";
import BooksCard from "../BookingManagement/BooksCard";
import Spinner from "../BookingManagement/Spinner";
import DashboardHeader from "../AdminDashboard/dashboardHeader"


function Bookadmin() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
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
    <>
      <DashboardHeader />
      <div className="flex flex-1 bg-gray-50">
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="w-auto h-12"
                src="../images/AaaaAuto (1).png"
                alt="Logo"
              />
            </div>

            <div className="px-4 mt-8">
              <label htmlFor="" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                
                </div>
              </div>
            </div>

            <div className="px-4 mt-6">
              <hr className="border-gray-200" />
            </div>

            <div className="flex flex-col flex-1 px-3 mt-6">
              <div className="space-y-4">
                <nav className="flex-1 space-y-2">
                  <a
                    href="#"
                    title=""
                    className="flex items-center px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-red-600 rounded-lg group"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 mr-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Dashboard
                  </a>
                </nav>
                <hr className="border-gray-200" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <main>
            <div className="py-6">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                {loading ? (
                  <Spinner /> // Show Spinner while loading
                ) : (
                  <BooksCard books={books} /> // Ensure BooksCard properly handles the books prop
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Bookadmin;
