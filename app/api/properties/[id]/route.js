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

// PUT /api/properties/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { id } = params;
    const { userId } = sessionUser;

    const formData = await request.formData();

    // Access all values from amenities
    const amenities = formData.getAll("amenities");

    // Get the property you are updating
    const existingApartment = await Apartment.findById(id);

    if (!existingApartment) {
      return new Response("Apartment does not exist", { status: 404 });
    }

    // Check if it is the owner that is actually editing the apartment
    if (existingApartment.owner.toString() !== userId) {
      return new Response("Unauthorized User", { status: 401 });
    }

    //    Create Property data Object
    const apartment = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    //    update apartment in Database
    const updatedApartment = await Apartment.findByIdAndUpdate(id, apartment);

    return new Response(JSON.stringify(updatedApartment), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update property", { status: 500 });
  }
};
