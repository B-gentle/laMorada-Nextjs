import connectDB from "@/config/database";
import Apartment from "@/models/Apartment";
import Message from "@/models/message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET /api/messages/unread-count
export const GET = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;

    const unreadMessageCount = await Message.countDocuments({
      receiver: userId,
      read: false,
    });

    return new Response(JSON.stringify({ count: unreadMessageCount }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
