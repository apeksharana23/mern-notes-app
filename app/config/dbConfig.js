import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;
if(!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}
export async function dbConnect() {
    if( cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        }).then((mongoose) => mongoose).catch((err) => {
            cached.promise = null;
            throw err;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (err) {
        cached.conn = null;
        throw err;
    }

    return cached.conn;
}
export default dbConnect;

