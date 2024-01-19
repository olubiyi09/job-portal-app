import { connectDB } from "@/config/dbConfig";
import { getDataFromToken } from "@/helpers/validateJWT";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function GET(request: NextRequest, { params }: { params: { userid: string } }) {

    try {
        // await getDataFromToken(request);
        const user = await User.findById(params.userid).select("-password");
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User found",
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

}