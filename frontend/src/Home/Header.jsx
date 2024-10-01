import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const updateUsername = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.username) {
      setUsername(userData.username);
    } else {
      setUsername('');
    }
  };

  useEffect(() => {
    updateUsername();

    window.addEventListener('storage', updateUsername);

    return () => {
      window.removeEventListener('storage', updateUsername);
    };
  }, []);

  const handleSignOut = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Update the state to remove the username
    setUsername('');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <header className="pb-6 bg-white lg:pb-0">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <Link to={"/"}>
              <img className="w-auto h-14 lg:h-14" src="../images/AaaaAuto (1).png" alt="Logo" />
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
          >
            <svg
              className="block w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
            </svg>

            <svg
              className="hidden w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
            <a href="/books/create" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">Service Appointments</a>
            <a href="/customer/create" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">Customer Support</a>
            <a href="/breakdownRequests/create" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">Breakdown Service</a>
            <a href="/store" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600">Store</a>
          </div>

          <div>
            {!username ? (
              <Link to={"/login"}>
                <button className="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white transition-all duration-200 bg-red-600 border border-transparent rounded-md lg:inline-flex hover:bg-red-700 focus:bg-red-700" role="button">
                  Sign In
                </button>
              </Link>
            ) : (
              <button
                onClick={handleSignOut}
                className="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white transition-all duration-200 bg-red-600 border border-transparent rounded-md lg:inline-flex hover:bg-red-700 focus:bg-red-700"
                role="button"
              >
                Sign Out
              </button>
            )}
          </div>

          <div className="ml-8"></div>

          {username && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar bg-white-600">
                <div className="w-10 rounded-full">
                  <img alt="User Avatar" src="../images/user.png" />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><a>Hi! {username}</a></li>
                <li>
                  <Link to={"/profile"}>Profile</Link>
                </li>
                <li>
                  <Link to={"/login"}>Admin Dashboard</Link>
                </li>
              </ul>
              
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
