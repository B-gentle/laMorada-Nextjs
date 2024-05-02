import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import { fetchProperties } from "@/utils/request";

const PropertiesPage = async () => {
  const properties = await fetchProperties();

  // Sort properties by date
  properties.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  return (
    <>
      <section className="bg-orange-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-6 py-4">
        <div className="container-xl lg:container m-auto px-4 py-6">
          {properties?.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties?.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;
