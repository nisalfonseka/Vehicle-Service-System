import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";
import HeroSection1 from "../components/HeroSection1";
import HeroSection2 from "../components/HeroSection2";
import HeroSection3 from "../components/HeroSection3";
import HeroSection4 from "../components/HeroSection4";

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
