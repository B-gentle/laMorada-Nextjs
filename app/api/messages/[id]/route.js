import connectDB from "@/config/database";
import Message from "@/models/message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// PUT /api/messages/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response("User ID is required", {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const message = await Message.findById(id);

    if (!message) {
      return new Response("Message not found", { status: 404 });
    }

    // verify ownership: make sure it is the owner of the message that is setting the read property to true;
    if (message.receiver.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // update message to read or unread depending on the message state
    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("Message not found"), { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    const message = await Message.findById(id);

    if (!message) {
      return new Response("Message not found", { status: 404 });
    }

    // verify ownership
    if (message.receiver.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await message.deleteOne();

    return new Response("Message Deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
