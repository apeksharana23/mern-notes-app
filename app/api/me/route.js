import User from '@/app/models/user';
import dbConnect from '@/app/config/dbConfig';
import { jwtVerify } from 'jose';

export async function GET(request) {
    try {
        await dbConnect();
        const authHeader = request.headers.get('authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return new Response(JSON.stringify({
                status: false,
                message: "Authorization token missing or malformed",
            }), { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        console.log("Received token:", token); 

        const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET);

        const { payload } = await jwtVerify(token, encodedKey); 

        console.log("Payload:", payload);

        const userId = payload.id;
        const user = await User.findById(userId);
        if (user) {
            return new Response(JSON.stringify({
                status: true,
                user: user
            }), { status: 200 });
        } else {
            return new Response(JSON.stringify({
                status: false,
                message: "User not found"
            }), { status: 400 });
        }

    } catch (err) {
        console.error("JWT verification error:", err);
        return new Response(JSON.stringify({
            status: false,
            message: err.message
        }), { status: 500 });
    }
}
