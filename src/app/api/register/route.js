import mongoose from "mongoose";
import User from "../models/User";

export async function POST(req) {
    const body = await req.json();
    mongoose.connect(process.env.MONGO_URL);
    const pass = body.password;
    if (!pass?.length || pass.length < 5) {
        new Error('password must be atleast 5 characters');
    }

    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(notHashedPassword, salt);
    body.password = hashedPassword;

    const createdUser = await User.create(body);
    return Response.json(createdUser);
}