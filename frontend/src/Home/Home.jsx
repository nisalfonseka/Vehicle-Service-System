import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../BookingManagement/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";

import HeroSection1 from "../Home/HeroSection1";
import HeroSection2 from "../Home/HeroSection2";
import HeroSection3 from "../Home/HeroSection3";
import HeroSection4 from "../Home/HeroSection4";

function Home() {
 

  return (
    <>
      <HeroSection1 />
      <HeroSection2 />
      <HeroSection4 />
      <HeroSection3 />

      
    </>

     

   
  );
}


export default Home;
