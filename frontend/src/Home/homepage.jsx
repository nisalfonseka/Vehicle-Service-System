// Home.js
import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";


function homepage() {

    useEffect(() => {
        setLoading(true);
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
    <main style={mainStyle}>
      <section style={heroSectionStyle}>
        <h1>Welcome to AutoService</h1>
        <p>Your trusted automotive service station.</p>
        <button style={ctaButtonStyle}>Get Started</button>
      </section>
      
    </main>
  );
}

const mainStyle = {
  padding: '20px',
};

const heroSectionStyle = {
  backgroundColor: '#0000FF',
  color: '#FFFFFF',
  textAlign: 'center',
  padding: '50px 20px',
};

const ctaButtonStyle = {
  backgroundColor: '#FF0000',
  color: '#FFFFFF',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const sectionStyle = {
  marginTop: '40px',
  textAlign: 'center',
};

export default homepage;
