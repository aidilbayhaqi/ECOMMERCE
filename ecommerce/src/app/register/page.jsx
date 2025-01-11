"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import axios from "axios";
import Image from "next/image";

const Page = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const router = useRouter();
  const { user, isError } = useSelector((state) => state.auth);
  const [file, setFile] = useState('')
  const [preview, setPreview] = useState('')
  const [msg, setMsg]=useState('')

  const saveUser = async(e)=>{
    e.preventDefault()
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confPassword", confPassword);
      formData.append("role", role);
      if (file) {
        formData.append("file", file);
      }

      await axios.post("http://localhost:5000/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push("/login");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  const loadImage = (e)=>{
    const images = e.target.files[0]
    setFile(images)
    setPreview(URL.createObjectURL(images))
  }

  return (
    <div className="w-full flex items-center justify-center">
      <form
        action=""
        className="bg-dark-secondary w-2/4 p-10 rounded-xl flex flex-col gap-8"
        onSubmit={saveUser}
      >
        <h1>REGISTER</h1>
        <input
          type="file"
          placeholder="Profie Picture"
          className="w-full p-5 border rounded bg-darkcard"
          onChange={loadImage}
        />
        {preview ? (
          <figure className="w-[100px] h-[100px] rounded-full overflow-hidden">
            <Image
              src={preview}
              width={100}
              height={100}
              className="object-cover"
            ></Image>
          </figure>
        ) : (
          ""
        )}

        {isError && <p className="">{msg}</p>}
        <input
          type="text"
          placeholder="username"
          className="w-full p-5 border rounded bg-darkcard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-5 border rounded bg-darkcard"
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
        />
        <select
          name=""
          id=""
          className="w-full p-5 border bg-darkcard"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">SELECT ROLE</option>
          <option value="user">User</option>
          <option value="admin" disabled>Admin</option>
        </select>
        <button className="bg-teal-700 p-3 rounded" type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Page;
