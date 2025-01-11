import Image from 'next/image'
import React from 'react'
import { MdShoppingBag, MdSupervisedUserCircle } from 'react-icons/md';

const Card = (props) => {
  return (
    <>
      <div className="cursor-pointer hover:bg-colorSoft">
        <div className="flex flex-col bg-primary w-full p-5 mt-8 rounded-xl gap-5 hover:scale-105 transition-all">
          <h1 className="font-bold text-2xl">
            Here happening in your sales last weeks
          </h1>
          <span className="text-2xl text-green-500 font-bold">
            Rp. 20.000.000{" "}
          </span>{" "}
          <span className="">
            <span className="text-teal-500">2,0000</span> product are selling in
            last weeks
          </span>
        </div>
        <div className="flex justify-between">
          <div className="bg-primary flex w-full p-5 mt-8 rounded-xl gap-5 m-3 hover:scale-105 transition-all">
            <MdSupervisedUserCircle className="w-14 h-14" />
            <div className="flex flex-col">
              <h1 className="text-green-500 font-bold text-2xl">
                {props.users}
              </h1>
              <span className="font-bold text-xl">
                TOTAL <span className="text-teal-500">ACTIVE</span> USERS
              </span>
            </div>
          </div>
          <div className="bg-primary flex w-full p-5 mt-8 rounded-xl gap-5 m-3 hover:scale-105 transition-all">
            <MdShoppingBag className="w-14 h-14" />
            <div className="flex flex-col">
              <h1 className="text-green-500 font-bold text-2xl">
                {props.product}
              </h1>
              <span className="font-bold text-xl">
                OF PRODUCT HAS BEEN <span className="text-teal-500">ADDED</span>
              </span>
            </div>
          </div>
          <div className="bg-primary flex w-full p-5 mt-8 rounded-xl gap-5 m-3 hover:scale-105 transition-all">
            <MdShoppingBag className="w-14 h-14" />
            <div className="flex flex-col">
              <h1 className="text-green-500 font-bold text-2xl">
                10
              </h1>
              <span className="font-bold text-xl">
                OF PRODUCT HAS BEEN <span className="text-teal-500">SOLD</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card