"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "@/lib/features/authSlice";
import Navbar from "../components/navbar";
import Link from "next/link";

axios.defaults.withCredentials = true;

const Page = () => {
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const getCart = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cart");
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const removeCart = async () => {
    try {
      await axios.delete(`http://localhost:5000/cart/${id}`);
      removeCart();
    } catch (error) {}
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="pt-24 p-5">
        <div className="p-2 block mb-5 gap-10">
          {cart.map((cartItem) => (
            <div key={cartItem.id}>
              <Link href={`/products/${cartItem.product.uuid}`}>
                <h1 className="font-bold text-2xl">{cartItem.product.name}</h1>
                <div className="md:flex md:justify-between block p-3">
                  <Image
                    className="h-52 border"
                    src={cartItem.product.url}
                    alt={cartItem.product.url}
                    width={200}
                    height={200}
                  ></Image>
                  <p className="font-bold text-2xl">{cartItem.product.price}</p>
                  <p className="font-bold text-2xl">
                    Quantity: {cartItem.quantity}
                  </p>
                  <div className="">
                    <button className="bg-lime-500 p-3 rounded hover:bg-lime-600">
                      Buy now
                    </button>
                    <button
                      onClick={removeCart}
                      className="bg-red-500 p-3 rounded hover:bg-red-600 mx-3"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          <div className="justify-between flex p-2">
            <h1 className="font-bold text-2xl">TOTAL: </h1>
            <h1 className="font-bold text-2xl">RP.100000</h1>
            <h1 className="font-bold text-2xl">10 Pcs</h1>
            <div className="">
              <button className="bg-lime-500 p-3 rounded hover:bg-lime-600">
                Buy now
              </button>
              <button
                onClick={removeCart}
                className="bg-red-500 p-3 rounded hover:bg-red-600 mx-3"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
