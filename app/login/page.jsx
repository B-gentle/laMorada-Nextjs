"use client";
import React, { useEffect, useState } from "react";
import { getProviders, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [providers, setProviders] = useState(false);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setAuthProviders();
  }, []);

  return (
    <section className="bg-orange-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 rounded-mdborder m-4 md:m-0 shadow-md">
          <form>
            <h2 className="text-3xl text-center font-semibold mb-6">Login</h2>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="text-gray-700 block font-bold mb-2"
              >
                Enter Username:
              </label>
              <input
                id="username"
                className="border rounded w-full py-2 px-3"
                type="text"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="text-gray-700 block font-bold mb-2"
              >
                Enter Password:
              </label>
              <input
                id="password"
                className="border rounded w-full py-2 px-3"
                type="password"
                required
              />
            </div>
            <div>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>

          {providers &&
            Object.values(providers).map((provider, index) => (
              <button
                className="bg-orange-900 hover:bg-orange-600 my-5 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                key={index}
                onClick={() => {
                  signIn(provider.id);
                }}
              >
                 <FaGoogle className="inline-block mr-2" /> Sign in with Google 
              </button>
            ))}

          <div className="flex justify-between">
            <span>Not yet a user? </span>{" "}
            <Link href="/register">Sign up here</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
