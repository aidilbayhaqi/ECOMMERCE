'use client'
import React,{useState, useEffect} from "react";
import Navbar from "@/app/components/navbar";
import Image from "next/image";
import CarouselPage from "./components/carousel";
import './globals.css'
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getMe } from "@/lib/features/authSlice";
import axios from "axios";
import Section from "./components/section";
import Card from "./components/card";
import Phone from "./components/phone";
import Laptop from "./components/laptop";
import Computer from "./components/computer";

 
axios.defaults.withCredentials = true

export default function Home() {
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.auth);

   useEffect(() => {
     dispatch(getMe());
   }, [dispatch]);

  return (
    <>
      <Navbar />
      <main className="bg-white dark:bg-dark-primary text-black dark:text-white pt-20">
        <Section />
        <CarouselPage />
        <Card />
        <Phone />
        <Laptop />
        <Computer />
      </main>
    </>
  );
}
