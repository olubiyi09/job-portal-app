import { connectDB } from "@/config/dbConfig";
import { getDataFromToken } from "@/helpers/validateJWT";
import Job from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function GET(request: NextRequest, { params }: any) {
    try {
        // getDataFromToken(request)
        const job = await Job.findById(params.jobid).populate("user");
        return NextResponse.json({
            message: "Job fetched seccessfully",
            data: job
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        },
            {
                status: 500
            })
    }
}

export async function PUT(request: NextRequest, { params }: any) {
    try {
        getDataFromToken(request)
        const reqBody = await request.json()
        const job = await Job.findByIdAndUpdate(params.jobid, reqBody, {
            new: true,
            runValidators: true,
        });

        return NextResponse.json({
            message: "Job Updated Successfully",
            data: job
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: any) {
    try {
        getDataFromToken(request)
        const job = await Job.findByIdAndDelete(params.jobid);

        return NextResponse.json({
            message: "Job Deleted Successfully",
            data: job
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}