import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "jobs"
        },
        status: {
            type: String,
            enum: ["pending", "shortlisted", "accepted", "rejected"]
        },
    }, {
    timestamps: true,
}
)

const Application = mongoose.models.application || mongoose.model("application", applicationSchema);

export default Application;