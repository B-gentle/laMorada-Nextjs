"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const ProfileDropDown = ({ setProfileMenu, signOut }) => {
  return (
    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col space-y-3 p-2">
      <Link
        href="/profile"
        onClick={() => {
          setProfileMenu(false);
        }}
      >
        My Profile
      </Link>
      <Link
        href="/properties/saved"
        onClick={() => {
          setProfileMenu(false);
        }}
      >
        Saved Properties
      </Link>
      <button
        className="text-left"
        onClick={() => {
          setProfileMenu(false);
          signOut();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileDropDown;
