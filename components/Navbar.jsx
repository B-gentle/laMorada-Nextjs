"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/images/laMoradoLogo.jpeg";
import { FaBars } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import ProfileDropDown from "./ProfileDropDown";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  const [dropdown, showDropdown] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const profileImage = session?.user?.image;

  const pathname = usePathname();

  return (
    <nav className="bg-[#cc5500]">
      {/* Desktop Menu */}
      {/* LHS */}
      <div className="flex justify-between items-center w-full mx-auto py-2 px-6">
        <div className="flex items-center space-x-2">
          <Link href="/" className="hidden md:flex no-underline">
            <Image className="w-[80px] h-[50px]" src={logo} alt="" />
          </Link>

          <span className="flex space-x-3 md:hidden">
            {session ? (
              <>
                <span>
                  <Image
                    src={profileImage}
                    alt=""
                    width={40}
                    height={40}
                    size={25}
                    color="white"
                    onClick={() => setProfileMenu(!profileMenu)}
                  />
                  {profileMenu && <ProfileDropDown setProfileMenu={setProfileMenu} signOut={signOut} />}
                </span>

                <span className="relative">
                  <IoNotifications size={18} color="white" />
                  <span className=" absolute left-[10px] top-[-10px] bg-red-500 text-white p-1 rounded-[100%] h-5 flex justify-center items-center">
                    2
                  </span>
                </span>
              </>
            ) : (
              <span className=" text-white flex gap-1">
                <Link className="" href="/login">
                  Login
                </Link>
                Or
                <Link className="" href="/register">
                  Register
                </Link>
              </span>
            )}
          </span>

          <div className="hidden md:flex space-x-3">
            <Link
              href="/"
              className={`${
                pathname === "/" ? "bg-[#3c3c3c]" : ""
              } text-white hover:bg-[#3c3c3c] px-3 py-2 rounded-[4px]`}
            >
              Home
            </Link>
            <Link
              href="/properties"
              className={`${
                pathname === "/properties" ? "bg-[#3c3c3c]" : ""
              } text-white hover:bg-[#3c3c3c] px-3 py-2 rounded-[4px]`}
            >
              Properties
            </Link>
            {session && (
              <Link
                href="/properties/add"
                className={`${
                  pathname === "/properties/add" ? "bg-[#3c3c3c]" : ""
                } text-white hover:bg-[#3c3c3c] px-3 py-2 rounded-[4px]`}
              >
                Add Properties
              </Link>
            )}
          </div>
        </div>
        {/* RHS */}
        <div className="hidden md:flex md:items-center space-x-4">
          {!session ? (
            <span className=" text-white flex gap-1">
              <Link className="" href="/login">
                Login
              </Link>
              Or
              <Link className="" href="/register">
                Register
              </Link>
            </span>
          ) : (
            <>
              <span className="relative">
                <IoNotifications size={18} color="white" />
                <span className=" absolute left-[10px] top-[-10px] bg-red-500 text-white p-1 rounded-[100%] h-5 flex justify-center items-center">
                  2
                </span>
              </span>

              <span className="relative">
                <Image
                  src={profileImage || ""}
                  alt=""
                  width={20}
                  height={20}
                  size={18}
                  color="white"
                  onClick={() => setProfileMenu(!profileMenu)}
                />
                {profileMenu && <ProfileDropDown setProfileMenu={setProfileMenu} signOut={signOut} />}
              </span>
            </>
          )}
        </div>

        <button
          onClick={() => {
            showDropdown(!dropdown);
          }}
          type="button"
          className="md:hidden inline-flex items-center justify-center border-none bg-transparent"
        >
          <span className="sr-only">Open main menu</span>
          <FaBars size={25} color="white" />
        </button>
      </div>
      {/* Mobile Menu */}
      {dropdown && (
        <div className="flex flex-col space-y-3 md:hidden">
          <Link
            href="/"
            className={`${
              pathname === "/" ? "bg-[#3c3c3c]" : ""
            } text-white hover:bg-[#3c3c3c] px-3 py-2 rounded-[4px]`}
          >
            Home
          </Link>
          <Link
            href="/properties"
            className={`${
              pathname === "/properties" ? "bg-[#3c3c3c]" : ""
            } text-white hover:bg-[#3c3c3c] px-3 py-2 rounded-[4px]`}
          >
            Properties
          </Link>
          {session && (
            <Link
              href="/properties/add"
              className={`${
                pathname === "/properties/add" ? "bg-[#3c3c3c]" : ""
              } text-white hover:bg-[#3c3c3c] px-3 py-2 rounded-[4px]`}
            >
              Add Properties
            </Link>
          )}
          {!session && (
            <span className=" text-white flex gap-1 ml-3">
              <Link className="" href="/login">
                Login
              </Link>
              Or
              <Link className="" href="/register">
                Register
              </Link>
            </span>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
