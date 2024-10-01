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

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email); // Regular expression for email validation
  const containsAtSymbol = (email) => email.includes("@"); // Check if email contains '@'
  const isValidUsername = (username) => username.length >= 3; // Username should be at least 3 characters
  const isValidPassword = (password) => password.length >= 3; // Password should be at least 6 characters

  const handleRegister = async () => {
    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // Form validation
    if (!trimmedEmail) {
      enqueueSnackbar("Please enter your email", { variant: "error" });
      return;
    }

    if (!containsAtSymbol(trimmedEmail)) {
      enqueueSnackbar("Email must contain an '@' symbol", { variant: "error" });
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      enqueueSnackbar("Please enter a valid email address", { variant: "error" });
      return;
    }

    if (!trimmedUsername) {
      enqueueSnackbar("Please enter a username", { variant: "error" });
      return;
    }

    if (!isValidUsername(trimmedUsername)) {
      enqueueSnackbar("Username must be at least 3 characters long", { variant: "error" });
      return;
    }

    if (!trimmedPassword) {
      enqueueSnackbar("Please enter a password", { variant: "error" });
      return;
    }

    if (!isValidPassword(trimmedPassword)) {
      enqueueSnackbar("Password must be at least 6 characters long", { variant: "error" });
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }

    // Registration logic
    const data = {
      email: trimmedEmail,
      username: trimmedUsername,
      password: trimmedPassword,
    };

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5555/api/user/register", data);

      if (response.status === 201) {
        enqueueSnackbar("Registration Successful", { variant: "success" });
        navigate("/login");
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
    <div className="flex items-center justify-center min-h-screen bg-white">
      {loading && <Spinner />} {/* Show a spinner while loading */}
      <div className="bg-white shadow-2xl rounded-lg p-10 max-w-lg w-full">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">Create Account</h1>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            placeholder="Confirm your password"
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full py-3 mt-6 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-200 ease-in-out disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-red-600 hover:underline transition-all duration-200">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
