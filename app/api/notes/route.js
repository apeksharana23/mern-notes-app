import { jwtVerify } from "jose";
import dbConnect from "@/app/config/dbConfig";
import Note from "@/app/models/notes";

const getUserId = async (req) => {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) throw new Error("Missing token");

  const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
  return payload.id;
};

export async function GET(req) {
  try {
    await dbConnect();
    const userId = await getUserId(req);
    const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });
    return Response.json({ status: true, data: notes });
  } catch (err) {
    return Response.json({ status: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const userId = await getUserId(req);
    const { title, content } = await req.json();
    const note = await Note.create({ title, content, user: userId });
    return Response.json({ status: true, data: note }, { status: 201 });
  } catch (err) {
    return Response.json({ status: false, message: err.message }, { status: 500 });
  }
}
