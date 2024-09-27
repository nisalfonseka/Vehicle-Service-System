import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
useEffect

const Start = () => {
    const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <h2 className="text-center">Login As</h2><br></br>
        <div className="d-flex justify-content-center align-items-center">
  <button type="button" className="btn btn-success" onClick={() => {navigate('/dashboard')}}>
    Admin
  </button>
</div>

      </div>
    </div>
  );
};

export default Start;