import User from '@/app/models/user';
import dbConnect from '@/app/config/dbConfig';
import bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        await dbConnect();
        const { name, email, phone, password, confirmPassword } = await request.json();


        if (!name || !email || !phone || !password || !confirmPassword) {
            return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
        }
        if (password !== confirmPassword) {
            return new Response(JSON.stringify({ message: 'Passwords do not match' }), { status: 400 });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
        }

        const plainText = "jdhhidbdndm#4545564";
        const saltRounds = 10;
        const token = await bcrypt.hash(plainText, saltRounds);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            verificationToken: token,
        });
        await newUser.save();
        return Response.json({
            status: true,
            message: " registered successfully",
            data: {
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
            }
        }, { status: 201 });

    } catch (err) {
        console.error("Signup Error:", err);
        return Response.json({ status: false, message: "Something went wrong" }, { status: 500 });
    }

}
