import { connectDB } from "@/config/dbConfig";
import Job from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const jobs = await Job.find().populate("user")
        // const jobs = await Job.find().populate("user")
        // console.log(jobs);

        return NextResponse.json({
            message: "Job fetched Successfully",
            data: jobs
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}