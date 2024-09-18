import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Spinner from "../BookingManagement/Spinner";
import axios from "axios"; // Import axios for API calls

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleRegister = async () => {
    // Trim input values to prevent issues caused by leading/trailing whitespace
    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // Form validation
    if (!trimmedEmail) {
      enqueueSnackbar("Please enter your email", { variant: "error" });
      return;
    }

    if (!trimmedUsername) {
      enqueueSnackbar("Please enter a username", { variant: "error" });
      return;
    }

    if (!trimmedPassword) {
      enqueueSnackbar("Please enter a password", { variant: "error" });
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }

    // Proceed with registration logic
    const data = {
      email: trimmedEmail,
      username: trimmedUsername,
      password: trimmedPassword,
    };

    setLoading(true);
    
    try {
      // Make API call to register the user
      const response = await axios.post('http://localhost:5555/api/user/register', data);
      
      if (response.status === 201) {
        enqueueSnackbar("Registration Successful", { variant: "success" });
        navigate("/login"); // Navigate to login page after successful registration
      } else {
        enqueueSnackbar("Registration Failed. Please try again.", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Error during registration. Please try again.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex items-center justify-center min-h-screen bg-gray-100">
      {loading && <Spinner />} {/* Show a spinner while loading */}
      <div className="flex flex-col max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-semibold text-center mb-6">Sign Up</h1>

        <div className="my-4">
          <label className="text-lg font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-300 px-4 py-2 w-full mt-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="my-4">
          <label className="text-lg font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 border-gray-300 px-4 py-2 w-full mt-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
        </div>

        <div className="my-4">
          <label className="text-lg font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-300 px-4 py-2 w-full mt-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <div className="my-4">
          <label className="text-lg font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-2 border-gray-300 px-4 py-2 w-full mt-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
          />
        </div>

        <button
          onClick={handleRegister}
          className="bg-red-600 text-white font-semibold text-lg py-3 mt-4 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-blue-500 focus:outline-none"
          disabled={loading} // Disable the button while loading
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account? 
          <a href="/login" className="text-blue-600 hover:underline ml-1">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
