"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

const CarouselPage = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data.slice(0, 6));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="w-full relative items-center text-center justify-center mt-14">
      <h1 className="font-bold text-4xl">NEW PRODUCT</h1>
      <span className="mt-5">See Whats New Product</span>
      <Carousel
        opts={{
          align: "start",
        }}
        className="mt-5 p-10"
      >
        <CarouselContent>
          {products.map((prods, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Link
                  href={`/products/${prods.uuid}`}
                  className="block relative group hover:scale-105 transition-all"
                >
                  <Card className="border-white overflow-hidden">
                    <CardContent className="flex flex-col p-0 relative items-center">
                      <Image
                        src={prods?.url}
                        width={500}
                        height={500}
                        className="object-cover w-full h-72"
                      ></Image>
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <h1 className="font-bold text-white text-2xl">
                          {prods.name}
                        </h1>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CarouselPage;
