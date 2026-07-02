const express = require("express");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

const Patient = require("./models/patient.js");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Static public folder
app.use(express.static(path.join(__dirname, "public")));


// Database File
const DATABASE = "database.json";


// Create database file automatically
if (!fs.existsSync(DATABASE)) {
    fs.writeFileSync(DATABASE, "[]");
}

// Home Page Route
app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );
});


// Patient Registration Page Route
app.get("/register", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "register.html")
    );
});


// Patient Records Page Route
app.get("/patients", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "patients.html")
    );
});

// Add New Patient
/*app.post("/add-patient", (req, res) => {

    // Read old patient data
    let patients = JSON.parse(
        fs.readFileSync(DATABASE)
    );


    // Create new patient object
    const newPatient = {

        patientId: "CP" + (patients.length + 1),

        name: req.body.name,

        age: req.body.age,

        gender: req.body.gender,

        date: req.body.date,

        mobile: req.body.mobile,

        address: req.body.address,

        disease: req.body.disease,

        emergency: req.body.emergency,

        status: req.body.status

    };


    // Add new patient
    patients.push(newPatient);


    // Save data in database.json
    fs.writeFileSync(
        DATABASE,
        JSON.stringify(patients, null, 2)
    );


    // Redirect to Patient Records
    res.redirect("/patients");

});*/

app.post("/add-patient", async (req, res) => {
  try {
    const newPatient = new Patient({
  fullName: req.body.name,
  age: req.body.age,
  gender: req.body.gender,
  registrationDate: req.body.date,
  mobile: req.body.mobile,
  address: req.body.address,
  disease: req.body.disease,
  emergencyCase: req.body.emergency,
  patientStatus: req.body.status,
});

    await newPatient.save();

    console.log("✅ Patient Saved Successfully");
    res.redirect("/patients");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving patient");
  }
});

// Get All Patient Records API
app.get("/api/patients", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching patients" });
  }
});


// Start CarePlus Hospital Server
app.listen(PORT, () => {

    console.log("================================");

    console.log(
        "CarePlus Hospital Management System Started"
    );

    console.log(
        "Open Browser: http://localhost:3000"
    );

    console.log("================================");

});