"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Search from "./search";
import DarkModeToggle from "./darkmode";
import { MdSupervisedUserCircle } from "react-icons/md";
import { CircleUser, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { getMe, LogOut, reset } from "@/lib/features/authSlice";
import { useRouter } from "next/navigation";
import axios from "axios";

const Navbar = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setisOpen] = useState(false);
  const [isOpenAcc, setisOpenAcc] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const [users, setUsers] = useState(false);
  const dispatch = useDispatch();

//   const getUserbyId = async () => {
//     const response = await axios.get("http://localhost:5000/users");
//     setUsers(response.data);
//   };

//   useEffect(()=>{
// getUserbyId()
//   })

  const logOut = () => {
    dispatch(LogOut());
    dispatch(reset());
    router.push("/");
  };

  const toggleDropdown = () => {
    setisOpen(!isOpen);
  };
  const toggleDropdownAcc = () => {
    setisOpenAcc(!isOpenAcc);
  };
  const toggleMenu = () => {
    setIsMenu(!isMenu);
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <nav className="bg-transparent text-white dark:text-white w-full p-5 justify-between md:flex z-50 md:z-50">
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl mt-2">TECHCOMP</h1>
        <button
          onClick={toggleMenu}
          type="button"
          class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset md:hidden focus:ring-white z-50"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span class="absolute -inset-0.5"></span>
          <span class="sr-only">Open main menu</span>

          <svg
            class="block h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>

          <svg
            class="hidden h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <ul
        className={`${
          isMenu ? "flex" : "hidden"
        } flex z-50 md:z-50 md:flex flex-col md:flex-row gap-10 items-center w-full md:w-auto mt-5 md:mt-0`}
      >
        <li className="font-bold text-xl z-50">
          <Link href={"/"}>HOME</Link>
        </li>
        <li className="relative font-bold text-xl z-50 md:z-50">
          <button onClick={toggleDropdown} className="flex">
            CATEGORIES
            <svg
              className={`ml-2 h-5 w-5 transition-transform transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isOpen && (
            <div className="mt-2 flex flex-col absolute bg-transparent p-4 justify-center rounded">
              <Link
                href={"/categories/phone"}
                className="py-2 p-2 rounded hover:scale-105 transition-all"
              >
                Phone
              </Link>
              <Link
                href={"/categories/laptop"}
                className="py-2 p-2 rounded hover:scale-105 transition-all"
              >
                Laptop
              </Link>
              <Link
                href={"/categories/computers"}
                className="py-2 p-2 rounded hover:scale-105 transition-all"
              >
                Computers
              </Link>
              <Link
                href={"/categories/other"}
                className="py-2 p-2 rounded hover:scale-105 transition-all"
              >
                Others
              </Link>
            </div>
          )}
        </li>
        <li className="font-bold text-xl z-50">
          <Link href={""}>COLLECTION</Link>
        </li>

        <div className="md:flex gap-5 items-center z-50">
          <Search />

          <div className="flex items-center gap-5 justify-center">
            <Link
              href="/cart"
              className="justify-center flex px-4 py-3 rounded hover:bg-secondary dark:hover:bg-dark-primary"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>

            <div className="relative hover:bg-secondary dark:hover:bg-dark-primary p-3 rounded z-50">
              <button onClick={toggleDropdownAcc} className="flex">
                <CircleUser className="w-5 h-5" />
                <svg
                  className={`ml-2 h-5 w-5 transition-transform transform ${
                    isOpenAcc ? "rotate-180" : "rotate-0"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isOpenAcc && (
                <div className="absolute right-1 mt-3 bg-secondary dark:bg-[#121212] p-10 items-center justify-center flex flex-col rounded ">
                  {user ? (
                    <>
                      {" "}
                      <div className="rounded-full overflow-hidden w-[80px] h-[80px]">
                        {user?.url ? (
                          <>
                            <Image
                              src={user?.url}
                              alt={user?.name}
                              width={100}
                              height={100}
                              className="rounded-full object-cover"
                            ></Image>
                          </>
                        ) : (
                          <>
                            <Image
                              src={"/no avatar.jpg"}
                              alt=","
                              width={50}
                              height={50}
                              className="rounded-full object-cover"
                            ></Image>
                          </>
                        )}
                      </div>
                      <span className="font-normal mt-5">{user?.name}</span>
                      <span className="font-thin">{user?.role}</span>
                      <Link
                        href={`/users/${user.uuid}`}
                        className="mt-3 font-bold text-center px-2 rounded hover:scale-105 transition-all"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={logOut}
                        className="mt-3 font-bold text-center px-2 rounded hover:scale-105 transition-all"
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Image
                        src={"/no avatar.jpg"}
                        alt=","
                        width={50}
                        height={50}
                        className="rounded-full"
                      ></Image>
                      <span className="font-normal mt-5">Uknown</span>
                      <span className="font-thin">user</span>
                      <Link
                        href={"/login"}
                        className="mt-3 font-bold text-center px-2 rounded hover:scale-105 transition-all"
                      >
                        Login
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
