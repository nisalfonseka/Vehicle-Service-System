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

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email); // Regular expression for email validation
  const containsAtSymbol = (email) => email.includes("@"); // Check if email contains '@'

  const handleLogin = async () => {
    // Form validation
    if (!email.trim()) {
      enqueueSnackbar("Please enter your email", { variant: "error" });
      return;
    }

    if (!containsAtSymbol(email)) {
      enqueueSnackbar("Email must contain an '@' symbol", { variant: "error" });
      return;
    }

    if (!isValidEmail(email)) {
      enqueueSnackbar("Please enter a valid email address", { variant: "error" });
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
        password,
      });

      if (response.status === 200) {
        const { token, username, _id: userId } = response.data;

        // Debugging: Check if userId is present
        if (!userId) {
          console.error("userId is missing from the response.");
        }

        // Store user details in localStorage
        localStorage.setItem('user', JSON.stringify({ username, token, userId, password}));
        // Show success message
        enqueueSnackbar("Login Successful", { variant: "success" });

        // Navigation logic for different users
        if (email === "bookingAdmin@gmail.com") {
          navigate("/dashboard/Bookadmin");
        } else if (email === "salesmanager@gmail.com") {
          navigate("/salesmanager");
        } else if (email === "senura123@gmail.com") {
          navigate("/dashboard/senura");
        } else if (email === "financeManager@gmail.com") {
          navigate("/dashboard/finance/dashboard");
        } else if (email === "hrManager@gmail.com") {
          navigate("/dashboard/emp/home");
        } else if (email === "supportAdmin@gmail.com") {
          navigate("/dashboard/Customer/dashboard");
        } else if (email === "breakdownAdmin@gmail.com") {
          navigate("/dashboard/breakdown/dashboard");
        } else if (email === "vehicleAdmin@gmail.com") {
          navigate("/dashboard/vehicle/dashboard");
        } else {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {loading && <Spinner />} {/* Show a spinner while loading */}
      <div className="flex flex-col max-w-lg w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>

        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-300 px-4 py-2 w-full mt-2 rounded-lg focus:outline-none focus:border-red-500 transition-all duration-200"
            placeholder="Enter your email"
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-300 px-4 py-2 w-full mt-2 rounded-lg focus:outline-none focus:border-red-500 transition-all duration-200"
            placeholder="Enter your password"
          />
        </div>

        <button
          onClick={handleLogin}
          className="bg-red-600 text-white font-semibold text-lg py-3 mt-4 rounded-lg hover:bg-red-700 transition-all duration-200 ease-in-out disabled:opacity-50"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account? 
          <a href="/Register" className="text-red-600 hover:underline ml-1 transition-all duration-200 ease-in-out">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
