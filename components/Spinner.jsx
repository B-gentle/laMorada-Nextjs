import Image from "next/image";
import loader from "@/assets/images/loader.gif";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image src={loader} alt="loader" />
    </div>
  );
};

export default Spinner;
