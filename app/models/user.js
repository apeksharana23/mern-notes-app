import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String, default: null },
    password: { type: String, required: true },
    profile: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true }  );

export default mongoose.models.User || mongoose.model('User', userSchema);