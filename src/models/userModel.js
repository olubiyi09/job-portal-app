import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        unique: true
    },

    email: {
        type: String,
        required: [true, "Please enter your email address"],
        unique: true
    },
    phone: {
        type: String,
        required: false,
    },


    password: {
        type: String,
        required: [true, "Please enter password"],
    },

    role: {
        type: String,
        required: [true, "Please enter your role"],
        enum: ["Employee", "Employer"],
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

    // Extra fields for employee
    skills: {
        type: [],
        required: false,
    },
    experience: {
        type: [],
        required: false,
    },
    education: {
        type: [],
        required: false,
    },
    careerobjective: {
        type: String,
        required: false,
    },

    // Extra fields for employer
    establishmentYear: {
        type: String,
        required: false,
    },
    companySize: {
        type: String,
        required: false,
    },
    website: {
        type: String,
        required: false,
    },
    about: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
