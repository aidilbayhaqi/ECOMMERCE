"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/app/hooks";
import axios from "axios";
import Search from "@/app/components/search";
import Image from "next/image";

const Users = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isError, user } = useAppSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState([]);
  const q = searchParams.get("q") || "";

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    let filteredUsers = response.data;

    if (q) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(q.toLowerCase())
      );
    }

    setUsers(filteredUsers.filter((user) => user.role === "user"));
    setAdmin(filteredUsers.filter((user) => user.role === "admin"));
  };

  useEffect(() => {
    getUsers();
  }, [q]);

  const deleteUsers = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    getUsers();
  };

  useEffect(() => {
    if (isError) {
      router.push("/");
    }
  }, [isError, router, user]);
  return (
    <>
      <div className="bg-colorSoft p-5 m-5 rounded-xl">
        <h1 className="font-bold text-xl">USERS</h1>
        <div className="flex justify-between">
          <h2 className="mt-2">List Of Admins</h2>
          {user && user.role === "admin" && (
            <div className="">
              <Link
                href={"/dashboard/users/addUser"}
                className="bg-primary p-3 rounded-md"
              >
                Add new
              </Link>
            </div>
          )}
        </div>

        <table className="w-full mt-5">
          <thead>
            <tr>
              <td>no</td>
              <td>Profile</td>
              <td>name</td>
              <td>email</td>
              <td>role</td>
              <td>actions</td>
            </tr>
          </thead>
          <tbody>
            {admin.map((admin, index) => (
              <tr key={admin.uuid}>
                <td>
                  <div className="mt-5">{index + 1}</div>
                </td>
                <td>
                  <div className="mt-5 rounded-full overflow-hidden w-[80px] h-[80px]">
                    {admin.url ? (
                      <Image
                        src={admin.url}
                        width={100}
                        height={100}
                        alt={admin.name}
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
                  <div className="mt-5">{admin.name}</div>
                </td>
                <td>
                  <div className="mt-5">{admin.email}</div>
                </td>
                <td>
                  <div className="mt-5">{admin.role}</div>
                </td>
                <td>
                  <div className="mt-5">
                    <Link
                      href={`/dashboard/users/${admin.uuid}`}
                      className="bg-teal-500 p-2 rounded-md gap-2 mr-3"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => deleteUsers(admin.uuid)}
                      className="bg-pink-500 p-2 rounded-md gap-2 mr-3"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-colorSoft p-5 m-5 rounded-xl">
        <h1 className="font-bold text-xl">USERS</h1>
        <div className="flex justify-between">
          <h2 className="mt-2">List Of Users</h2>
          {user && user.role === "admin" && (
            <div className="">
              <Link
                href={"/dashboard/users/addUser"}
                className="bg-primary p-3 rounded-md"
              >
                Add new
              </Link>
            </div>
          )}
        </div>

        <table className="w-full mt-5">
          <thead>
            <tr>
              <td>no</td>
              <td>Profile</td>
              <td>name</td>
              <td>email</td>
              <td>role</td>
              <td>actions</td>
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
                  <div className="mt-5">{users.name}</div>
                </td>
                <td>
                  <div className="mt-5">{users.email}</div>
                </td>
                <td>
                  <div className="mt-5">{users.role}</div>
                </td>
                <td>
                  <div className="mt-5">
                    <Link
                      href={`/dashboard/users/${users.uuid}`}
                      className="bg-teal-500 p-2 rounded-md gap-2 mr-3"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => deleteUsers(users.uuid)}
                      className="bg-pink-500 p-2 rounded-md gap-2 mr-3"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
