import connectDB from "@/config/database";
import Apartment from "@/models/Apartment";

// GET /api/properties/search
export const GET = async (request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const propertyType = searchParams.get('propertyType');

    console.log(location, propertyType)

    return new Response(JSON.stringify({message: 'success'}), {status: 200})
  } catch (error) {
    return new Response('Something went wrong', { status: 500})
  }
};
