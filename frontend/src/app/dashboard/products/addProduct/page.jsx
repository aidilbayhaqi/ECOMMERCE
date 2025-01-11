"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/app/hooks";
import axios from "axios";
import Image from "next/image";

const AddProduct = () => {
  const router = useRouter();
  const { isError, user } = useAppSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [cat, setCat] = useState("");
  const [file, setFile] = useState("");
  const [desc, setDesc] = useState("");
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");

  const newProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("categories", cat);
      formData.append("desc", desc);
      if (file) {
        formData.append("file", file);
      }
      await axios.post("http://localhost:5000/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      router.push("/dashboard/products");
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
      <h1 className="font-bold text-xl">PRODUCTS</h1>
      <h2 className="mt-2">Create Products</h2>

      <form
        onSubmit={newProduct}
        action=""
        className="bg-colorSoft p-14 rounded-md flex flex-col justify-center gap-8"
      >
        <label htmlFor="">PRODUCT IMAGES</label>
        <input
          type="file"
          placeholder="product name"
          className="w-full p-5 border bg-primary rounded"
          onChange={loadImage}
        />
        {preview ? (
          <figure>
            <Image src={preview} width={100} height={100}></Image>
          </figure>
        ) : (
          ""
        )}
        <label htmlFor="">PRODUCT NAME</label>
        <input
          type="text"
          placeholder="product name"
          className="w-full p-5 border bg-primary rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="">PRICE</label>
        <input
          type="number"
          placeholder="price"
          className="w-full p-5 border bg-primary rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="">STOCK</label>
        <input
          type="number"
          placeholder="stock"
          className="w-full p-5 border bg-primary rounded"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />{" "}
        <label htmlFor="">DESCRIPTION</label>
        <textarea
          type="text"
          placeholder="Add the Description"
          className="w-full p-5 border bg-primary rounded"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <label htmlFor="">CATEGORIES</label>
        <select
          name=""
          id=""
          className="w-full p-5 border bg-primary rounded"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        >
          <option value="">SELECT CATEGORIES</option>
          <option value="PHONE">PHONE</option>
          <option value="LAPTOP">LAPTOP</option>
          <option value="COMPUTERS">COMPUTERS</option>
          <option value="OTHERS">OTHERS</option>
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

export default AddProduct;
