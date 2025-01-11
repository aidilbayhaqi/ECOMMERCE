'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useAppSelector } from '../hooks'
import Search from './search'

const Navbar = () => {
  const {user} = useAppSelector((state)=>state.auth)
  const pathname = usePathname()
  return (
    <div className=" flex justify-between bg-colorSoft p-5 m-5 rounded-xl">
      <div className="items-center capitalize pt-3 font-bold">hi {user && user.name}, welcome to {pathname.split("/").pop()}</div>
      <Search/>
    </div>
  );
}

export default Navbar