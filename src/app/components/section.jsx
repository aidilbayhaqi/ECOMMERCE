import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const Section = () => {
  return (
    <section className="h-screen flex items-center justify-center text-center">
      <Image
        src={"/bg-section.jpg"}
        objectFit="cover"
        fill
        quality={100}
        priority
      ></Image>
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="relative z-20 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in-down">
          Welcome To{" "}
          <span className="text-red-500 text-5xl sm:text-6xl md:text-7xl font-bold">
            TechComp
          </span>
        </h1>
        <p className="text-lg sm:text-xl mb-8 animate-fade-in-up">
          Discover the best technology products and services tailored for you.
          From cutting-edge gadgets to innovative solutions, were your one-stop
          destination for all things tech.
        </p>
        <div className="animate-fade-in">
          <h2 className="mb-6 text-2xl sm:text-3xl font-bold">
            Ready to Explore?
          </h2>
          <Link
            href="/shop"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 inline-block"
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Section