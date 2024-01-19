import { connectDB } from "@/config/dbConfig";
import { getDataFromToken } from "@/helpers/validateJWT";
import Job from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function POST(request: NextRequest) {

    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.json()
        const job = await Job.create({ ...reqBody, user: userId });

        return NextResponse.json({
            message: "Job Posted Successfully",
            data: job
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}

export async function GET(request: NextRequest) {
    try {
        getDataFromToken(request);
        // fetch query string parameters
        // const { searchParams } = new URL(request.url)
        // const user = searchParams.get("user")

        // const filtersObject: any = {};
        // if (user) {
        //     filtersObject["user"] = user;
        // }
        // const jobs = await Job.find(filtersObject).populate("user")
        // console.log(jobs);
        const { searchParams } = new URL(request.url);
        const user = searchParams.get("user");
        const title = searchParams.get("title");
        const location = searchParams.get("location");


        const filtersObject: any = {};
        if (user) {
            filtersObject["user"] = user;
        }

        if (title && title !== "") {
            filtersObject["title"] = { $regex: title, $options: "i" };
        }

        if (location && location !== "") {
            filtersObject["location"] = { $regex: location, $options: "i" };
        }

        const jobs = await Job.find(filtersObject).populate("user");
        return NextResponse.json({
            message: "Jobs fetched successfully",
            data: jobs,
        });



        return NextResponse.json({
            message: "Job fetched Successfully",
            data: jobs
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}