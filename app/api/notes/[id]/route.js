import dbConnect from "@/app/config/dbConfig";
import Note from "@/app/models/notes";
import { jwtVerify } from "jose";

// 🔐 Token verification helper
const getUserId = async (req) => {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) throw new Error("Missing token");

  const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
  return payload.id;
};

export async function PUT(req, context) {
  try {
    await dbConnect();
    const userId = await getUserId(req);
    const { title, content } = await req.json();

    const { id } = await context.params;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, user: userId },
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return Response.json({ status: false, message: "Note not found" }, { status: 404 });
    }

    return Response.json({ status: true, data: updatedNote });
  } catch (err) {
    return Response.json({ status: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    await dbConnect();
    const userId = await getUserId(req);

    const { id } = await context.params;

    const deleted = await Note.findOneAndDelete({ _id: id, user: userId });

    if (!deleted) {
      return Response.json({ status: false, message: "Note not found" }, { status: 404 });
    }

    return Response.json({ status: true, message: "Note deleted" });
  } catch (err) {
    return Response.json({ status: false, message: err.message }, { status: 500 });
  }
}
