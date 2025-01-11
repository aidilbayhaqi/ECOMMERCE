"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { getMe } from "@/lib/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "@/app/components/navbar";

axios.defaults.withCredentials = true;

const ProductPage = () => {
  const [product, setProduct] = useState(null); // Set initial state to null
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  // Fetch product using id
  const getProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setProduct(response.data);
      console.log("Fetched Product:", response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // Handle adding item to cart
  const handleAddCart = async () => {
    if (!product || !user) {
      console.error("Product or user not available");
      return;
    }

    const cartData = {
      productId: product.id, // Use UUID for productId
      quantity: 1,
      userId: user.id,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/cart",
        cartData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Item added to cart successfully", response.data);
      alert('Added to cart successfully')
      // You can update UI or give feedback here
    } catch (error) {
      console.error(
        "Error adding item to cart:",
        error.response ? error.response.data : error.message
      );
      // Handle error here (like showing a message to the user)
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  useEffect(() => {
    dispatch(getMe()); // Fetch user details
    console.log("Current user");
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center pt-20 md:items-start p-5 md:p-10 gap-10 bg-white dark:bg-dark-primary text-black dark:text-white">
        <div className="flex-shrink-0 w-full md:w-1/2 pt-20">
          {product && (
            <Image
              src={product.url}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg shadow-md"
            />
          )}
        </div>

        <div className="flex flex-col w-full md:w-1/2 space-y-5 pt-20">
          {product ? (
            <>
              <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
              <p className="text-teal-500 text-2xl font-semibold">
                {product.price}
              </p>
              <p className="text-gray-700">Stock: {product.stock} Pcs</p>
              <p className="text-lg text-black dark:text-white text-justify">
                {product.desc}
              </p>
              <div className="flex gap-5 mt-5">
                <button
                  className="bg-teal-500 font-bold px-6 py-3 rounded-lg shadow hover:bg-teal-600 transition-all"
                  onClick={handleAddCart}
                >
                  Add to Cart
                </button>
                <button className="bg-lime-500 font-bold px-6 py-3 rounded-lg shadow hover:bg-lime-600 transition-all">
                  Buy Now
                </button>
              </div>
            </>
          ) : (
            <p>Loading product...</p> // Show loading message while the product is being fetched
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
