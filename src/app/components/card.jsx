import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const Card = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data.slice(0, 9));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="w-full p-10 mt-5 items-center justify-center text-center gap-5 ">
      <h1 className="font-bold text-4xl">PRODUCTS</h1>
      <span className="mt-5">Here is were best product</span>
      <div className="flex gap-10 w-full flex-wrap justify-between mt-5">
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

export default Card;
