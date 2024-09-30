import { useEffect, useState } from "react";
import axios from "axios";
import VehiclesCard from "../VehicleManagement/VehiclesCard";
import Spinner from "../BookingManagement/Spinner";
import CreateVehicle from "../VehicleManagement/CreateVehicles";
import Home from "../VehicleManagement/Home"

function VehicleDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState("overview");

  useEffect(() => {
    axios
      .get("http://localhost:5555/vehicles")
      .then((response) => {
        console.log(response.data);
        setVehicles(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const renderComponent = () => {
    if (currentView === "overview") {
      return <CreateVehicle />;
    } else if (currentView === "dashboard") {
      return loading ? <Spinner /> : <Home/>;
    }
  };

  return (
    <>
      <div className="flex flex-1 bg-gray-50">
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="w-auto h-12"
                src="../../../images/AaaaAuto (1).png"
                alt="Logo"
              />
            </div>

            <div className="px-4 mt-6">
              <hr className="border-gray-200" />
            </div>

            <div className="flex flex-col flex-1 px-3 mt-6">
              <div className="space-y-4">
                <nav className="flex-1 space-y-2">
                  <a
                    href="#"
                    onClick={() => setCurrentView("overview")}
                    title="Add Vehicle"
                    className={`flex items-center px-4 py-2.5 text-sm font-medium ${
                      currentView === "overview"
                        ? "bg-red-600"
                        : "bg-white hover:bg-gray-100"
                    } transition-all duration-200 rounded-lg group`}
                  >
                    <svg
                      className={`flex-shrink-0 w-5 h-5 mr-4 ${
                        currentView === "overview" ? "text-white" : "text-black"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"
                      />
                    </svg>
                    <span
                      className={`${
                        currentView === "overview" ? "text-white" : "text-black"
                      }`}
                    >
                      Overview
                    </span>
                  </a>
                </nav>

                <nav className="flex-1 space-y-2">
                  <a
                    href="#"
                    onClick={() => setCurrentView("dashboard")}
                    title="Dashboard"
                    className={`flex items-center px-4 py-2.5 text-sm font-medium ${
                      currentView === "dashboard"
                        ? "bg-red-600"
                        : "bg-white hover:bg-gray-100"
                    } transition-all duration-200 rounded-lg group`}
                  >
                    <svg
                      className={`flex-shrink-0 w-5 h-5 mr-4 ${
                        currentView === "dashboard" ? "text-white" : "text-black"
                      }`}
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
                    <span
                      className={`${
                        currentView === "dashboard" ? "text-white" : "text-black"
                      }`}
                    >
                      Dashboard
                    </span>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <main>
            <div className="py-6">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                {renderComponent()}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default VehicleDashboard;
