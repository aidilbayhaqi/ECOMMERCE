'use client'
import React from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { getMe } from "@/app/lib/features/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";

import axios from "axios";

axios.defaults.withCredentials = true;

const Layout = ({ children }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isError } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      router.push("/");
    }
  }, [isError, router]);
  
  return (
    <div className="flex bg-color bg-text">
      <div className="flex w-60 p-5 min-h-screen bg-colorSoft">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
