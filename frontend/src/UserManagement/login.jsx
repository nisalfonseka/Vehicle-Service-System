import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Spinner from "../BookingManagement/Spinner";
import axios from "axios"; // Assuming axios for making API calls

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async () => {
    // Form validation
    if (!email.trim()) {
      enqueueSnackbar("Please enter your email", { variant: "error" });
      return;
    }
  
    if (!password.trim()) {
      enqueueSnackbar("Please enter your password", { variant: "error" });
      return;
    }
  
    // Start login logic
    setLoading(true);
  
    try {
      // Replace with your actual API URL
      const response = await axios.post("http://localhost:5555/api/user/login", {
        email,
        password
      });
  
      if (response.status === 200) {
        const { token, username, _id: userId } = response.data;

        // Debugging: Check if userId is present
        if (!userId) {
          console.error("userId is missing from the response.");
        }
  
        // Store user details in localStorage
        localStorage.setItem('user', JSON.stringify({ username, token, userId }));
        // Show success message
        enqueueSnackbar("Login Successful", { variant: "success" });
  
        if (email === "bookingAdmin@gmail.com") {
          navigate("/dashboard/Bookadmin");
        } else if (email === "salesmanager@gmail.com") {
          navigate("/salesmanager");
        } else if (email === "senura123@gmail.com") {
          navigate("/senura");
        }
        else if (email === "financeManager@gmail.com") {
          navigate("/dashboard/finance/dashboard");
        } 
        else if (email === "hrManager@gmail.com") {
          navigate("/dashboard/emp/home");
        } 
        else if (email === "supportAdmin@gmail.com") {
          navigate("/dashboard/Customer/dashboard");
        }  else {
          navigate("/");
        }
  
        // Refresh the page
        window.location.reload();
      } else {
        enqueueSnackbar("Invalid email or password", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Login failed. Please check your credentials.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="p-6 flex items-center justify-center min-h-screen bg-gray-100">
      {loading && <Spinner />} {/* Show a spinner while loading */}
      <div className="flex flex-col max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-semibold text-center mb-6">Login</h1>

        <div className="my-4">
          <label className="text-lg font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-300 px-4 py-2 w-full mt-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-100"
            placeholder="Enter your email"
          />
        </div>

        <div className="my-4">
          <label className="text-lg font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-300 px-4 py-2 w-full mt-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-100"
            placeholder="Enter your password"
          />
        </div>

        <button
          onClick={handleLogin}
          className="bg-red-600 text-white font-semibold text-lg py-3 mt-4 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-500 focus:outline-none"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account? 
          <a href="/Register" className="text-blue-600 hover:underline ml-1">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
