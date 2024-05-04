import connectDB from "@/config/database";
import Apartment from "@/models/Apartment";


// GET /api/properties/featured
export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Apartment.find({is_featured: true});

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
