"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { LoginUser, reset } from "@/app/lib/features/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const Login = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const dispatch = useAppDispatch();
 const router = useRouter();
 const { user, isError, isSuccess, isLoading, message } = useAppSelector(
   (state) => state.auth
 );

 useEffect(() => {
   if (user || isSuccess) {
     router.push("/dashboard");
   }
   dispatch(reset());
 }, [user, isSuccess, dispatch, router]);

 const Auth = (e) => {
   e.preventDefault();
   dispatch(LoginUser({ email, password }));
 };
 

  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <form
        action=""
        className="bg-colorSoft p-14 rounded-md flex flex-col justify-center gap-8"
        onSubmit={Auth}
      >
        {isError && <p className="has-text-centered">{message}</p>}
        <h1>LOGIN</h1>
        <input
          type="text"
          placeholder="email"
          className="w-full p-5 border bg-primary rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="w-full p-5 border bg-primary rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-teal-500 cursor-pointer rounded p-3">
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
