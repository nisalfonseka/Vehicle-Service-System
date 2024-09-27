import React, { useState, useEffect } from "react";
import axios from "axios";
import BreakdownCard from "./BreakdownSingleCard";

const BreakdownView = ({ onStatusUpdate }) => {
  const [breakdownRequests, setBreakdownRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    const fetchBreakdownRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5555/breakdownRequests");
        setBreakdownRequests(response.data.data);
        setFilteredRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching breakdown requests:", error);
      }
    };
    fetchBreakdownRequests();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  // Filtering breakdown requests based on today's date
  const todayBreakdownCount = breakdownRequests.filter(request => 
    new Date(request.createdAt).toISOString().split("T")[0] === today
  ).length;

  const todayConfirmedCount = breakdownRequests.filter(request => 
    new Date(request.createdAt).toISOString().split("T")[0] === today && request.status === "Accepted"
  ).length;

  const todayDeclinedCount = breakdownRequests.filter(request => 
    new Date(request.createdAt).toISOString().split("T")[0] === today && request.status === "Declined"
  ).length;

  const allRequestsCount = breakdownRequests.length;

  return (
    <div>
      <h1 className="text-3xl font-medium text-black text-center mt-2">
        Today's Breakdown Requests Overview
      </h1>
      <br />
      <div className="flex flex-wrap justify-center mx-auto max-w-7xl">
        {/* Cards for breakdown request statistics */}
        {[
          { count: todayBreakdownCount, title: "Breakdown Requests Today", bgColor: "bg-purple-600" },
          { count: todayConfirmedCount, title: "Confirmed Requests Today", bgColor: "bg-green-500" },
          { count: todayDeclinedCount, title: "Declined Requests Today", bgColor: "bg-red-500" },
          { count: allRequestsCount, title: "Total Breakdown Requests", bgColor: "bg-blue-500" },
        ].map((card, index) => (
          <div
            key={index}
            className={`border border-gray-300 rounded-xl p-6 m-2 relative shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl ${card.bgColor}`}
            style={{ width: "350px", height: "180px" }}
          >
            <h2 className="text-6xl font-semibold text-white text-center">
              {card.count}
            </h2>
            <h1 className="text-lg font-medium text-white text-center mt-2">
              {card.title}
            </h1>
          </div>
        ))}
      </div>

      {/* Breakdown Cards */}
      
    </div>
  );
};

export default BreakdownView;
