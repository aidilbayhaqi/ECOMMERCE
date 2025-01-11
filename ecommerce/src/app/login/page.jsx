'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { LoginUser, reset } from '@/lib/features/authSlice';

axios.defaults.withCredentials = true;

const Page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

useEffect(() => {
  if (user || isSuccess) {
    router.push("/");
  }
  dispatch(reset());
}, [user, isSuccess, dispatch, router]);

const Auth = (e) => {
  e.preventDefault();
  dispatch(LoginUser({ email, password }));
};

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        action=""
        className="bg-dark-secondary p-10 rounded-xl flex flex-col gap-8"
        onSubmit={Auth}
      >
        {isError && <p className="has-text-centered">{message}</p>}
        <h1>LOGIN</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-5 border rounded bg-darkcard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-5 border rounded bg-darkcard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-teal-500 cursor-pointer rounded p-3">
          {isLoading ? "Loading..." : "Login"}
        </button>
        <Link href={"/register"}>Dont have any acount? lets register</Link>
      </form>
    </div>
  );
}

export default Page