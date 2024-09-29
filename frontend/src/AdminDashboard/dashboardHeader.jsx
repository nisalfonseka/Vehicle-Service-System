import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function DashboardHeader() {
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
          {/* Left side: Logo */}
          <div className="flex items-start">
            <Link to="/">
              <img className="w-auto h-9 lg:h-11" src="../../../images/web.png" alt="HomePage" />
            </Link>
          </div>

          {/* Center: Title */}
          <div className="flex justify-center flex-grow">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>

          {/* Right side: User greeting and avatar */}
          <div className="flex ml-auto items-center">
            {username && <span className="mr-4">Hi! {username}</span>}

            {/* User avatar dropdown */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar bg-white-600">
                <div className="w-10 rounded-full">
                  <img alt="User Avatar" src="../../../images/user.png" />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <Link to="/">
                  Go To Ashan Auto Services
                </Link>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default DashboardHeader;
