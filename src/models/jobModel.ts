import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    workmode: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },

}, {
    timestamps: true,
})


const Job = mongoose.models.jobs || mongoose.model("jobs", jobSchema);

export default Job;
