"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/app/hooks";
import axios from "axios";
import Image from "next/image";

const Products = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isError, user } = useAppSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const q = searchParams.get("q") || "";


  const getProduct = async () => {
    const response = await axios.get("http://localhost:5000/products");
    let filteredProduct = response.data
    if (q) {
      filteredProduct = filteredProduct.filter((user) =>
        user.name.toLowerCase().includes(q.toLowerCase())
      );
    }
    setProducts(filteredProduct);
  };

  useEffect(() => {
    getProduct();
  }, [q]);

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    getProduct();
  };

  useEffect(() => {
    if (isError) {
      router.push("/");
    }
  }, [isError, router, user]);
  

  return (
    <div className="bg-colorSoft p-5 m-5 rounded-xl">
      <h1 className="font-bold text-xl">PRODUCTS</h1>
      <div className="flex justify-between">
        <h2 className="mt-2">List Of Products</h2>
        {user && user.role === "admin" && (
          <div className="">
            <Link
              href={"/dashboard/products/addProduct"}
              className="bg-primary p-3 rounded-md"
            >
              Add new
            </Link>
          </div>
        )}
      </div>
      <table className="w-full mt-5">
        <thead>
          <tr>
            <td>no</td>
            <td>Images</td>
            <td>Product name</td>
            <td>Price</td>
            <td>Stock</td>
            <td>Categories</td>
            <td>Created by</td>
          </tr>
        </thead>
        <tbody>
          {products.map((products, index) => (
            <tr key={products.uuid}>
              <td>
                <div className="mt-5">{index + 1}</div>
              </td>
              <td>
                <div className="mt-5 p-3">
                  <Image src={products.url} width={100} height={100} className="rounded"></Image>
                </div>
              </td>
              <td>
                <div className="mt-5 p-3">{products.name}</div>
              </td>
              <td>
                <div className="mt-5 p-3">
                  {products.price}
                </div>
              </td>
              <td>
                <div className="mt-5 p-3">{products.stock} Pcs</div>
              </td>
              <td>
                <div className="mt-5 p-3">{products.categories}</div>
              </td>
              <td>
                <div className="mt-5 p-3">{products.user.name}</div>
              </td>
              <td>
                <div className="mt-5 p-3">
                  <Link
                    href={`/dashboard/products/${products.uuid}`}
                    className="bg-teal-500 p-2 rounded-md gap-5 mr-3"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => deleteProduct(products.uuid)}
                    className="bg-pink-500 p-2 rounded-md gap-5 mr-3 mt-3"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
