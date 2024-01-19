import { connectDB } from "@/config/dbConfig";
import { getDataFromToken } from "@/helpers/validateJWT";
import Application from "@/models/applicationModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function POST(request: NextRequest) {

    try {
        await getDataFromToken(request);
        const reqBody = await request.json()
        const application = await Application.create(reqBody);
        // console.log(application);


        return NextResponse.json({
            message: "Application Successfully",
            data: application
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}

export async function GET(request: NextRequest) {
    try {
        getDataFromToken(request);
        // fetch query string parameters
        const { searchParams } = new URL(request.url)
        const user = searchParams.get("user")
        const job = searchParams.get("job")

        const filtersObject: any = {};
        if (user) {
            filtersObject["user"] = user;
        }
        if (job) {
            filtersObject["job"] = job;
        }

        const applications = await Application.find(filtersObject)
            .populate("user")
            .populate({
                path: "job",
                populate: {
                    path: "user",
                },
            });
        // console.log(applications);



        return NextResponse.json({
            message: "Application fetched Successfully",
            data: applications
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}