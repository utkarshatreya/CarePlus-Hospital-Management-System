const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
{
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    disease: {
        type: String,
        required: true
    },
    emergencyCase: {
        type: String,
        default: "No"
    },
    patientStatus: {
        type: String,
        default: "Normal"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Patient", patientSchema);