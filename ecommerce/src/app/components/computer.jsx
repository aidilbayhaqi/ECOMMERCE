import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const Computer = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(
      response.data.filter((product) => product.categories === "COMPUTERS").slice(0, 6)
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="relative w-full p-10 mt-5 items-center justify-center text-center gap-5 ">
      <div className="flex flex-col md:flex-row justify-between px-5 mb-5">
        <h1 className="font-bold text-4xl">COMPUTER</h1>
        <Link href={`/categories/computers`}>See All</Link>
      </div>
      <div className="flex gap-10 w-full flex-wrap justify-between">
        {products.map((prods, index) => (
          <div
            className="border border-dark-primary dark:border dark:border-white rounded w-80 flex flex-col items-center p-5 "
            key={index}
          >
            <Link
              href={`/products/${prods.uuid}`}
              className="pointer hover:scale-105 transition-all"
            >
              <Image
                src={prods.url}
                width={300}
                height={300}
                className="h-52 "
                alt="."
              ></Image>
              <div className="flex flex-col">
                <h1 className="font-bold mt-2">{prods.name}</h1>
                <span>{prods.categories}</span>
                <span className="text-teal-500">{prods.price}</span>
                <span>{prods.stock} Pcs of stock</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Computer;