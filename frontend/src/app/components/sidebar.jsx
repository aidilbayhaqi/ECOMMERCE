"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdLogout,
} from "react-icons/md";
import { LogOut, reset } from "@/app/lib/features/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import axios from "axios";

const menu = [
  {
    title: "dashboard",
    path: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    title: "Users",
    path: "/dashboard/users",
    icon: <MdSupervisedUserCircle />,
  },
  {
    title: "Products",
    path: "/dashboard/products",
    icon: <MdShoppingBag />,
  },
];

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    router.push("/");
  };

  const pathname = usePathname();
  return (
    <div className="sticky w-full">
      <Link href={`/dashboard/users/${user && user.uuid}`}>
        <div className="flex items-center gap-5 mb-5">
        <div className="rounded-full overflow-hidden w-[50px] h-[50px]">
          {user && user.url ? (
            <Image
              src={user && user.url}
              width={100}
              height={100}
              alt={''}
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
          <div className="flex flex-col">
            <div className="font-bold">{user && user.name}</div>
            <div className="text-xs bg-textSoft">{user && user.role}</div>
          </div>
        </div>
      </Link>
      <ul className="list-none mt-5">
        {menu.map((index) => (
          <li key={index.title} className="cursor-pointer mt-5">
            <Link
              href={index.path}
              className={`flex py-3 px-2 hover:bg-primary gap-3 rounded-md ${
                pathname === index.path && "bg-primary"
              } `}
            >
              <div className="">{index.icon}</div>
              <span className="font-bold">{index.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={logout} className="flex gap-3 font-bold mt-5 py-3 px-2">
        <MdLogout />
        LogOut
      </button>
    </div>
  );
};

export default Sidebar;
