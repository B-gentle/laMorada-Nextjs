import Apartment from "@/components/Apartment";
import PropertySearchForm from "@/components/PropertySearchForm";

const PropertiesPage = async () => {
  return (
    <>
      <section className="bg-orange-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <Apartment />
    </>
  );
};

export default PropertiesPage;
