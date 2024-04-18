import connectDB from "@/config/database";
import Apartment from "@/models/Apartment";
import { getSessionUser } from "@/utils/getSessionUser";

// GET /api/properties/:id

export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const apartment = await Apartment.findById(params.id);

    if (!apartment) {
      return new Response("Apartment not found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(apartment), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};

//DELETE /api/prooperties/:id
export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User Id is required", { status: 401 });
    }

    const { userId } = sessionUser;

    await connectDB();

    const apartment = await Apartment.findById(propertyId);

    if (!apartment) return new Response("apartment not found", { status: 404 });

    // verify apartment ownership
    if (apartment.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await apartment.deleteOne();

    return new Response("Property Deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
