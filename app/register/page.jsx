"use client";
import AddPropertyForm from "@/components/AddPropertyForm";
import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    name: "",
    description: "",
    location: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
    beds: "",
    baths: "",
    square_feet: "",
    amenities: [],
    rates: {
      weekly: "",
      monthly: "",
      nightly: "",
    },
    seller_info: {
      name: "",
      email: "",
      phone: "",
    },
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      // this is for nested states e.g location.street, street is the innerkey while location is the outer key
      const [outerkey, innerkey] = name.split(".");

      setForm((prev) => ({
        ...prev,
        [outerkey]: { ...prev[outerkey], [innerkey]: value },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheckBoxChange = (e) => {
    const { value, checked } = e.target;

    // clone the current array
    const updatedAmenities = [...form.amenities];

    if (checked) {
      // Add value to the Array
      updatedAmenities.push(value);
    } else {
      // Remove Value from array
      const index = updatedAmenities.indexOf(value);

      if (index !== -1) {
        updatedAmenities.splice(index, 1);
      }
    }

    // update state with updated array
    setForm((prev) => ({
      ...prev,
      amenities: updatedAmenities,
    }));
  };

  const handleImageChange = (e) => {
    const { files } = e.target;

    // Clone Images Array
    const updatedImages = [...form.images];

    // Add new files to the Array
    for (const file of files) {
      updatedImages.push(file);
    }

    // update state with array of images
    setForm((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  return (
    <section className="bg-orange-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form
            action="/api/properties"
            method="POST"
            encType="multipart/form-data"
          >
            <h2 className="text-3xl text-center font-semibold mb-6">
             Register
            </h2>

            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter Username"
                value={form.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter email"
                value={form.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="cpassword"
                name="cpassword"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Confirm Password"
                value={form.cpassword}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="images"
                className="block text-gray-700 font-bold mb-2"
              >
                Upload Profile Image
              </label>
              <input
                type="file"
                id="images"
                name="images"
                className="border rounded w-full py-2 px-3"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                required
              />
            </div>

            <div>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
