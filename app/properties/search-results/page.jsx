"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoadingPage from "@/app/loading";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultPage = () => {
  const searchPrams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchPrams.get("location");
  const propertyType = searchPrams.get("propertyType");

  useEffect(() => {
    const fetchSearchResult = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResult();
  }, [location, propertyType]);
  return (
    <>
      <section className="bg-orange-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      {loading ? (
    <LoadingPage />
  ) : (
    <section className="px-6 py-4">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <Link href="/properties" className="flex items-center text-orange-500 hover:underline mb-3"><FaArrowAltCircleLeft className="mr-2 mb-1" /> Back to properties</Link>
        <h1 className="text-2xl mb-4">Search Results</h1>
        {properties?.length === 0 ? (
          <p>No Search Results found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties?.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  )}
    </>
  );
};

export default SearchResultPage;
