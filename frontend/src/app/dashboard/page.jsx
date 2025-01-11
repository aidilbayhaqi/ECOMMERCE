"use client";
import Card from "../components/card";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/app/hooks";
import axios from "axios";
import Users from "./users/page";
import Image from "next/image";
import Link from "next/link";

const Dashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isError, user } = useAppSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [product, setProduct] = useState([]);
  const [productCount, setproductCount] = useState(0);

  const q = searchParams.get("q") || "";

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    let filteredData = response.data
    if(q){
      filteredData = filteredData.filter((user) =>
        user.name.toLowerCase().includes(q.toLowerCase())
    );
  }
    const userData = filteredData.filter((user) => user.role === "user");
  setUsers(userData.slice(0, 5));
  setUsersCount(response.data.length);
    
  };

  useEffect(() => {
    getUsers();
  }, [q]);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
     let filteredData = response.data;
     if (q) {
       filteredData = filteredData.filter((user) =>
         user.name.toLowerCase().includes(q.toLowerCase())
       );
     }
    setProduct(filteredData);
    setproductCount(response.data.length);
  };

  useEffect(() => {
    getProducts();
  }, [q]);

  return (
    <>
      {/* card */}
      <div className="bg-colorSoft m-5 p-5 rounded-xl">
        <h1 className="font-bold">Dashboard</h1>
        <Card users={usersCount} product={productCount} />
      </div>

      {/* user table */}
      <div className="bg-colorSoft m-5 p-5 rounded-xl">
        <div className="flex justify-between">
          <h1 className="font-bold text-xl">Users</h1>
          <Link
            href={"/dashboard/users"}
            className="bg-primary p-3 items-end rounded-md"
          >
            See all
          </Link>
        </div>
        <table className="w-full mt-5">
          <thead>
            <tr>
              <td>No</td>
              <td>Profile</td>
              <td>Name</td>
              <td>Email</td>
              <td>Role</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {users.map((users, index) => (
              <tr key={users.uuid}>
                <td>
                  <div className="mt-5">{index + 1}</div>
                </td>
                <td>
                  <div className="mt-5 rounded-full overflow-hidden w-[80px] h-[80px]">
                    {users.url ? (
                      <Image
                        src={users.url}
                        width={100}
                        height={100}
                        alt={users.name}
                        className="object-cover"
                      />
                    ) : (
                      <div>
                        <Image
                          src={"/no avatar.jpg"}
                          width={100}
                          height={100}
                          className="object-cover"
                        ></Image>
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="mt-5 uppercase">{users.name}</div>
                </td>
                <td>
                  <div className="mt-5 uppercase">{users.email}</div>
                </td>
                <td>
                  <div className="mt-5 text-teal-500 font-bold uppercase">
                    {users.role}
                  </div>
                </td>
                <td>
                  <span className="bg-green-500 p-2 mt-6 rounded-md cursor-pointer">
                    ACTIVE
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-colorSoft m-5 p-5 rounded-xl">
        <div className="flex justify-between">
          <h1 className="font-bold text-xl">Products</h1>
          <Link
            href={"/dashboard/products"}
            className="bg-primary p-3 items-end rounded-md"
          >
            See all
          </Link>
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
            {product.map((products, index) => (
              <tr key={products.uuid}>
                <td>
                  <div className="mt-5">{index + 1}</div>
                </td>
                <td>
                  <div className="mt-5">
                    <Image src={products.url} width={100} height={100}></Image>
                  </div>
                </td>
                <td>
                  <div className="mt-5">{products.name}</div>
                </td>
                <td>
                  <div className="mt-5">{products.price}</div>
                </td>
                <td>
                  <div className="mt-5">{products.stock} Pcs</div>
                </td>
                <td>
                  <div className="mt-5">{products.categories}</div>
                </td>
                <td>
                  <div className="mt-5">{products.user.name}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
