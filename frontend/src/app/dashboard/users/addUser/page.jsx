"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/app/hooks";
import axios from "axios";
import Image from "next/image";

const AddUser = () => {
  const router = useRouter();
  const { isError, user } = useAppSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");

  const saveUser = async (e) => {
    e.preventDefault();
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
      router.push("/dashboard/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  const loadImage = (e) => {
    const images = e.target.files[0];
    setFile(images);
    setPreview(URL.createObjectURL(images));
  };

  useEffect(() => {
    if (isError) {
      router.push("/");
    }
    if (user && user.role !== "admin") {
      router.push("/dashboard");
    }
  }, [isError, router, user]);

  return (
    <div className="bg-colorSoft p-5 m-5 rounded-md">
      <h1 className="font-bold text-xl">USERS</h1>
      <h2 className="mt-2">Create Users</h2>
      <form
        onSubmit={saveUser}
        action=""
        className="bg-colorSoft p-14 rounded-md flex flex-col justify-center gap-8"
      >
        <label htmlFor="">PROFILE IMAGES</label>
        <input
          type="file"
          placeholder="product name"
          className="w-full p-5 border bg-primary rounded"
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
        <label htmlFor="">USERNAME</label>
        <input
          type="text"
          placeholder="username"
          className="w-full p-5 border bg-primary rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="">EMAIL</label>
        <input
          type="text"
          placeholder="email"
          className="w-full p-5 border bg-primary rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">PASSWORD</label>
        <input
          type="password"
          placeholder="password"
          className="w-full p-5 border bg-primary rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="">CONFIRM PASSWORD</label>
        <input
          type="password"
          placeholder="password"
          className="w-full p-5 border bg-primary rounded"
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
        />
        <label htmlFor="">ROLE</label>
        <select
          name=""
          id=""
          className="w-full p-5 border bg-primary rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">SELECT ROLE</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button
          type="submit"
          className="bg-teal-500 cursor-pointer rounded p-3 mt-2"
        >
          SAVE
        </button>
      </form>
    </div>
  );
};

export default AddUser;
